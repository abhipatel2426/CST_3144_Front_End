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
        showLessons: true
    },
    created() {
        // Fetch lessons from backend
        fetch('http://localhost:3050/lessons')
            .then(response => response.json())
            .then(data => {
                this.lessons = data;
            })
            .catch(err => console.error('Error fetching lessons:', err));
    },
    methods: {
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
            this.showinformation = !this.showinformation; // Toggle visibility
        },
        removeFromCart(lesson) {
            const index = this.cart.indexOf(lesson);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        },
        isFormValid() {
            return this.user.name && this.user.phone;
        },
        submitOrder() {
            console.log('User data before submission:', this.user);
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

            fetch('http://localhost:3050/order', {
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
                .then(data => {
                    if (data.error) {
                        alert('Order submission failed: ' + data.error);
                    } else {
                        alert('Order placed successfully! Order ID: ' + data.orderId);
                        this.cart = [];
                        this.user = { name: '', phone: '' };
                        this.showLessons = true;
                    }
                })
                .catch(err => console.error('Error submitting order:', err));
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        },
        totalPrice() {
            return this.cart.reduce((sum, lesson) => sum + lesson.Price, 0);
        }
       
    }
});
