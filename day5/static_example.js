class User {
    static userCount = 0;

    constructor(name) {
        this.name = name;
        User.userCount++;
    }

    static totalUsers() {
        return User.userCount;
    }
}

new User("Alice");
new User("Bob");

console.log(User.userCount);        // 2
console.log(User.totalUsers());     // 2