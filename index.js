const BACKEND_URL = 'https://lessons-app.onrender.com';

new Vue({
    el: '#app',
    data: {
        showinformation: true, 
        sitename: 'Lesson App',
        lessons: [],
        cart: [],
        user: {
            name: '',
            phone: ''
        },
        showLessons: true,
        sortAttribute: 'subject', // Default sorting attribute
        sortOrder: 'asc', // Default sorting order
        searchQuery: "",

    },
    created() {
        // Fetch lessons from backend
        this.fetchLessons();
    },
    methods: {
         fetchLessons() {
            fetch(`${BACKEND_URL}/lessons`)
                .then(response => response.json())
                .then(data => {
                    this.lessons = data;
                })
                .catch(err => console.error('Error fetching lessons:', err));
        },
        sortLessons() {
            this.lessons.sort((a, b) => {
                let comparison = 0;
                if (a[this.sortAttribute] > b[this.sortAttribute]) {
                    comparison = 1;
                } else if (a[this.sortAttribute] < b[this.sortAttribute]) {
                    comparison = -1;
                }
                return this.sortOrder === 'asc' ? comparison : -comparison;
            });
        },
    
        spaceLeft(lesson) {
            // Calculate the remaining space for a lesson
            let countInCart = this.cart.filter(cartLesson => cartLesson.id === lesson.id).length;
            return lesson.Space - countInCart;
        },
        canAddToCart(lesson) {
            // Return true if space is available, false otherwise
            return this.spaceLeft(lesson) > 0;
        },
        addtocart(lesson) {
            this.cart.push(lesson);
        },
        showCheckout() {
            if (this.cart.length > 0) {
                this.showinformation = !this.showinformation;
            } else {
                alert('Your cart is empty. Add lessons to proceed.');
            } // Toggle visibility
        },
        removeFromCart(lesson) {
            const index = this.cart.indexOf(lesson);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
            if (this.cart.length === 0) {
                this.showinformation = true; // Redirect to lessons view if the cart is empty
            }
        },
        validatePhone() {
            // Remove any character that is not a number
            this.user.phone = this.user.phone.replace(/[^0-9]/g, '');
        },
       
        submitOrder() {
            
            
            if (!this.user.name || !this.user.phone) {
                alert('Please provide both name and phone.');
                return;
            }
        
            if (this.cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            const order = {
                name: this.user.name,
                phone: this.user.phone,
                lessonIDs: this.cart.map(lesson => lesson.id),
                spaces: this.cart.map(() => 1) // Assuming 1 space per lesson
            };
            console.log('Submitting order:', order);

            fetch(`${BACKEND_URL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
                .then(async data => {
                    if (data.error) {
                        alert('Order submission failed: ' + data.error);
                    } else {
                        alert('Order placed successfully! Order ID: ' + data.orderId);
                        window.location.reload();


                            // Update spaces for each lesson in the order
                            const updateRequests = order.lessonIDs.map((lessonId, index) => {
                                const spacesToDeduct = order.spaces[index];
                                return fetch(`${BACKEND_URL}/lessons/${lessonId}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ newSpace: spacesToDeduct })
                                });
                            });

                            // Wait for all PUT requests to complete
                await Promise.all(updateRequests); 
                // Fetch updated lessons from the server
                this.fetchLessons();
                   
                        this.lessons = updatedLessons; // Update lessons in frontend
                   
                        this.cart = [];
                        this.user = { name: '', phone: '' };
                        this.showinformation = true;
                    
                    }
                })
                .catch(err => console.error('Error submitting order:', err));
        },
        updateLessonSpace(lessonId, newSpace) {
            fetch(`${BACKEND_URL}/lessons/${lessonId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newSpace })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Lesson space updated successfully');
                this.fetchLessons(); // Refresh lessons from the server
            })
            .catch(err => console.error('Error updating lesson space:', err));
        },
        searchLessons() {
            if (!this.searchQuery.trim()) {
                alert('Please enter a search query.');
                return;
            }
    
            fetch(`${BACKEND_URL}/search?query=${encodeURIComponent(this.searchQuery)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Search failed.');
                    }
                    return response.json();
                })
                .then(data => {
                    this.lessons = data; // Update lessons with search results
                })
                .catch(err => console.error('Error during search:', err));
        }

    },
    
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        },
        totalPrice() {
            return this.cart.reduce((sum, lesson) => sum + lesson.Price, 0);
        },
        isFormValid() {
             // Phone must be numeric and non-empty
        const isPhoneValid = /^[0-9]+$/.test(this.user.phone) && this.user.phone.trim() !== '';
            return this.user.name.trim() !== '' && this.user.phone.trim() !== '';
        },
        canCheckout() {
            return this.cart.length > 0;
        }
        
        
    },
    watch: {
        sortAttribute: 'sortLessons',
        sortOrder: 'sortLessons',
        searchQuery(newQuery) {
            if (newQuery.trim()) {
                this.searchLessons();
            }
        }
    }
});
