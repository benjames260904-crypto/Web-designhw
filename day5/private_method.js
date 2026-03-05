class Counter {
    #x = 0;

    #inc() {
        this.#x++;
        console.log(this.#x);
    }

    publicInc() {
        this.#inc();
    }
}

const c = new Counter();
c.publicInc();