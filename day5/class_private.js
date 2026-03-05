class MyClass {
    a = 1;        // public
    #b = 2;       // private

    incB() {
        this.#b++;
        console.log(this.#b);
    }
}

const m = new MyClass();
m.incB();   