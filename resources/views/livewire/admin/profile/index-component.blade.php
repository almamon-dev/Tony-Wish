<main class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 no-scrollbar">
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Manage Profile</h1>
                <p class="text-sm text-gray-600 mt-1">User profile settings</p>
            </div>
        </div>

        <!-- add product Card -->
        <div x-data="{ tab: 'profile' }" class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <!-- Tabs -->
            <div class="border-b border-gray-200 px-4 flex items-center space-x-6">
                <button @click="tab = 'profile'"
                    :class="tab === 'profile'
                        ?
                        'border-b-2 border-orange-500 text-orange-500' :
                        'text-gray-600 hover:text-orange-500'"
                    class="py-3 font-semibold transition">
                    Profile
                </button>

                <button @click="tab = 'password'"
                    :class="tab === 'password'
                        ?
                        'border-b-2 border-orange-500 text-orange-500' :
                        'text-gray-600 hover:text-orange-500'"
                    class="py-3 font-semibold transition">
                    Update Password
                </button>
            </div>

            <!-- TAB CONTENT -->
            <div class="p-6">
                <!-- ================= PROFILE TAB ================= -->
                <div x-show="tab === 'profile'">
                    <!-- Avatar + Change Image section -->
                    <div class="flex flex-col lg:flex-row gap-6 items-start">
                        <div class="relative">
                            <img src="https://i.pravatar.cc/150?img=12"
                                class="w-24 h-24 rounded-lg object-cover border shadow-sm" />
                            <button
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                ✕
                            </button>
                        </div>

                        <div>
                            <label for="uploadImg"
                                class="cursor-pointer inline-block px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 transition">
                                Change Image
                            </label>
                            <input id="uploadImg" type="file" class="hidden" />
                            <p class="text-xs text-gray-500 mt-2">
                                Upload image below 2MB (JPG, PNG)
                            </p>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="my-6 border-t"></div>

                    <!-- Profile Form -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="text-sm font-medium">First Name *</label>
                            <input type="text"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                                value="Jeffry" />
                        </div>

                        <div>
                            <label class="text-sm font-medium">Last Name *</label>
                            <input type="text"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                                value="Jordan" />
                        </div>

                        <div>
                            <label class="text-sm font-medium">Email *</label>
                            <input type="email"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                                value="jeffry@example.com" />
                        </div>

                        <div>
                            <label class="text-sm font-medium">Phone Number *</label>

                            <input type="text"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                                value="+17468314286" />
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end gap-3 mt-6">
                        <button class="px-4 py-2 bg-slate-800 text-white rounded-md shadow">
                            Cancel
                        </button>
                        <button class="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">
                            Save Changes
                        </button>
                    </div>
                </div>

                <!-- ================= PASSWORD TAB ================= -->
                <div x-show="tab === 'password'">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="text-sm font-medium">New Password *</label>
                            <input type="password"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all" />
                        </div>
                        <div>
                            <label class="text-sm font-medium">New Password *</label>
                            <input type="password"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all" />
                        </div>

                        <div>
                            <label class="text-sm font-medium">Confirm New Password *</label>
                            <input type="password"
                                class="w-full border rounded-lg px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all" />
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button class="px-4 py-2 bg-slate-800 text-white rounded-md shadow">
                            Cancel
                        </button>
                        <button class="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
