class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo() {
        return `${this.#brand} ${this.#model} ${this.speed} ${this.isTrunkOpen}`;
    }

    go() {
        if (this.speed < 200 && !this.isTrunkOpen) {
            this.speed += 5;
            return this;
        }
    }

    breaks() {
        if (this.speed !== 0) {
            this.speed -= 5;
            return this;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } 
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        if (this.speed < 300) {
            this.speed += this.acceleration;
            return this;
        }
    }

    openTrunk() {
        return '';
    }

    closeTrunk() {
        return '';
    }

}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3'
});

const raceCar1 = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

car1.go().go().go();
car2.go().go();

raceCar1.go().go();

console.log(raceCar1.displayInfo());
console.log(car1.displayInfo());