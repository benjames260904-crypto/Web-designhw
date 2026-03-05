class MyClass {
    #x = 0;

    set x(value) {
        if (value >= 0) {
            this.#x = value;
        } else {
            console.log("Value must be non-negative");
        }
    }

    get x() {
        return this.#x;
    }

    inc() {
        this.#x++;
    }
}

const m = new MyClass();
m.x = 5;
console.log(m.x); // 5
m.inc();
console.log(m.x); // 6
m.x = -3;         // Value must be non-negative