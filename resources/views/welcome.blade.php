<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DreamsPOS - Smart Business Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <style>
        * {
            font-family: 'Instrument Sans', sans-serif;
        }

        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .hero-gradient {
            background: linear-gradient(to right, #4f46e5, #7c3aed, #9333ea);
        }

        .feature-card {
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .btn-glow {
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .btn-glow:hover {
            box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
        }

        .floating-animation {
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-10px);
            }

            100% {
                transform: translateY(0px);
            }
        }

        .fade-in {
            animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>

<body class="bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <i class="fas fa-crown text-white"></i>
                    </div>
                    <div>
                        <h1
                            class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            DreamsPOS
                        </h1>
                    </div>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
                    <a href="#" class="text-gray-700 hover:text-indigo-600 font-medium">Features</a>
                    <a href="#" class="text-gray-700 hover:text-indigo-600 font-medium">Pricing</a>
                    <a href="#" class="text-gray-700 hover:text-indigo-600 font-medium">About</a>
                    <a href="#" class="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
                </div>

                <!-- Auth Buttons -->
                <div class="flex items-center space-x-4">
                    <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium hidden md:block">Sign
                        In</a>
                    <a href="#"
                        class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full btn-glow hover:shadow-lg transition-all duration-300">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
        <div class="container mx-auto">
            <div class="flex flex-col lg:flex-row items-center">
                <!-- Left Content -->
                <div class="lg:w-1/2 fade-in">
                    <div
                        class="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
                        <span class="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        <span class="text-sm font-medium">Introducing DreamsPOS 2.0</span>
                    </div>

                    <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Smart Business
                        <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Management
                        </span>
                        Made Easy
                    </h1>

                    <p class="text-xl text-gray-600 mb-10 max-w-2xl">
                        Transform your business operations with our all-in-one POS solution. Manage inventory,
                        customers,
                        and analytics from one beautiful dashboard.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <a href="#"
                            class="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow hover:shadow-xl transition-all duration-300 text-center">
                            Start Free Trial
                            <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                        <a href="#"
                            class="w-full sm:w-auto flex items-center justify-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium group">
                            <div
                                class="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                <i class="fas fa-play text-indigo-600"></i>
                            </div>
                            <span>Watch Demo</span>
                        </a>
                    </div>

                    <div class="mt-12 flex items-center space-x-8">
                        <div>
                            <p class="text-3xl font-bold text-gray-900">5000+</p>
                            <p class="text-gray-600">Happy Businesses</p>
                        </div>
                        <div class="w-px h-12 bg-gray-300"></div>
                        <div>
                            <p class="text-3xl font-bold text-gray-900">24/7</p>
                            <p class="text-gray-600">Customer Support</p>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Dashboard Preview -->
                <div class="lg:w-1/2 mt-16 lg:mt-0 lg:pl-16 floating-animation">
                    <div class="relative">
                        <!-- Dashboard Card -->
                        <div
                            class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 border border-gray-200">
                            <!-- Dashboard Header -->
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                                    <div>
                                        <div class="h-2 w-24 bg-gray-300 rounded"></div>
                                        <div class="h-2 w-16 bg-gray-200 rounded mt-1"></div>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>

                            <!-- Dashboard Content -->
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                                    <div class="h-4 w-1/2 bg-blue-400 rounded mb-2"></div>
                                    <div class="h-8 w-3/4 bg-blue-300 rounded"></div>
                                </div>
                                <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                                    <div class="h-4 w-1/2 bg-purple-400 rounded mb-2"></div>
                                    <div class="h-8 w-3/4 bg-purple-300 rounded"></div>
                                </div>
                            </div>

                            <!-- Chart -->
                            <div class="bg-gray-100 p-4 rounded-xl">
                                <div class="flex justify-between items-center mb-4">
                                    <div class="h-4 w-32 bg-gray-300 rounded"></div>
                                    <div class="h-8 w-20 bg-gray-300 rounded"></div>
                                </div>
                                <div class="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                            </div>

                            <!-- Recent Activity -->
                            <div class="mt-4">
                                <div class="h-4 w-40 bg-gray-300 rounded mb-3"></div>
                                <div class="space-y-3">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-green-500 rounded-full"></div>
                                        <div class="flex-1">
                                            <div class="h-3 w-3/4 bg-gray-300 rounded"></div>
                                            <div class="h-2 w-1/2 bg-gray-200 rounded mt-1"></div>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                                        <div class="flex-1">
                                            <div class="h-3 w-2/3 bg-gray-300 rounded"></div>
                                            <div class="h-2 w-1/3 bg-gray-200 rounded mt-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Elements -->
                        <div
                            class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-xl flex items-center justify-center">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <div
                            class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-xl flex items-center justify-center">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Powerful features designed to help your business grow and thrive in the digital age
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div
                    class="feature-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200">
                    <div
                        class="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <i class="fas fa-store text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Smart POS System</h3>
                    <p class="text-gray-600 mb-4">
                        Process transactions quickly with our intuitive point-of-sale system that works on any device.
                    </p>
                    <a href="#" class="inline-flex items-center text-blue-600 font-medium">
                        Learn more
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Feature 2 -->
                <div
                    class="feature-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200">
                    <div
                        class="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <i class="fas fa-tags text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Badge Categories</h3>
                    <p class="text-gray-600 mb-4">
                        Create and manage customer loyalty badges to reward your most valuable customers.
                    </p>
                    <a href="#" class="inline-flex items-center text-purple-600 font-medium">
                        Learn more
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Feature 3 -->
                <div
                    class="feature-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200">
                    <div
                        class="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                        <i class="fas fa-chart-bar text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                    <p class="text-gray-600 mb-4">
                        Get actionable insights with detailed reports and analytics for better business decisions.
                    </p>
                    <a href="#" class="inline-flex items-center text-green-600 font-medium">
                        Learn more
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 hero-gradient">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
            </h2>
            <p class="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses already using DreamsPOS to grow their revenue and streamline operations.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#"
                    class="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300">
                    Start Free 14-Day Trial
                </a>
                <a href="#"
                    class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300">
                    Schedule a Demo
                </a>
            </div>
            <p class="text-indigo-200 mt-6">No credit card required • Cancel anytime</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-8 md:mb-0">
                    <div class="flex items-center space-x-3 mb-4">
                        <div
                            class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <i class="fas fa-crown text-white"></i>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">DreamsPOS</h1>
                            <p class="text-sm">Smart Business Solutions</p>
                        </div>
                    </div>
                    <p class="max-w-md">Transform your business operations with our all-in-one POS solution designed
                        for modern entrepreneurs.</p>
                </div>

                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-facebook text-xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-instagram text-xl"></i>
                    </a>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                <p>&copy; 2024 DreamsPOS. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple script for mobile menu (if needed later)
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DreamsPOS Welcome Page loaded successfully!');

            // Add scroll animation
            window.addEventListener('scroll', function() {
                const nav = document.querySelector('nav');
                if (window.scrollY > 50) {
                    nav.classList.add('shadow-lg', 'bg-white');
                    nav.classList.remove('bg-white/80');
                } else {
                    nav.classList.remove('shadow-lg', 'bg-white');
                    nav.classList.add('bg-white/80');
                }
            });
        });
    </script>
</body>

</html>
