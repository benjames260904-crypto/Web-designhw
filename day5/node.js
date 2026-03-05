class Article {
    static publisher = "VTC Academy";

    show() {
        console.log(this.publisher);                 // undefined
        console.log(this.constructor.publisher);     // VTC Academy
        console.log(Article.publisher);              // VTC Academy
    }
}

new Article().show();

//

class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value > 0) {
            this._radius = value;
        } else {
            console.log("Bán kính phải là số dương");
        }
    }

    area() {
        return Math.PI * this._radius ** 2;
    }
}

const c = new Circle(5);
console.log(c.radius);   // 5
c.radius = 10;
console.log(c.area());
c.radius = -3;           // lỗi

//

class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} chạy ${speed} km/h`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} dừng lại`);
    }
}

class Lion extends Animal {
    roar() {
        console.log(`${this.name} đang gầm`);
    }
}

const lion = new Lion("Sư tử");
lion.run(80);
lion.stop();
lion.roar();

//

class Person {
    getName() {
        return "Vinh Pham";
    }

    getAge() {
        return 20;
    }
}

class Student extends Person {
    getAge() {
        return super.getAge() + 1;
    }

    getName() {
        return `${super.getName()} - Student`;
    }

    getMajor() {
        return "Computer Science";
    }
}

const s = new Student();
console.log(s.getAge());    // 21
console.log(s.getName());   // Vinh Pham - Student
console.log(s.getMajor());