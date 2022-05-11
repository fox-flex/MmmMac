/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

// after course OOP by Oles Dobosevych I cant can't don't touch this baseclass
class Dish {
    cookingTime;
    requiredIngredients

    constructor(cookingTime, requiredIngredients = []) {
        // https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
        if (this.constructor === Dish) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.cookingTime = cookingTime;
        this.requiredIngredients = requiredIngredients;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
    If I paste code here, it would be a comment, not a piece of code. Absurd...
*/

class Ingredient {
    // Ingredient
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class Bolognese extends Dish {
    static #BOLOGNESE_COCKING_TIME = 10;

    constructor() {
        super(Bolognese.#BOLOGNESE_COCKING_TIME,
            [new Ingredient('spaghetti', 1),
                new Ingredient('meat', 5), // MORE MEET
                new Ingredient('tomato', 1),
        ]);
    }
}

class MashedPotatoes extends Dish {
    static #MASHED_POTATOES_COCKING_TIME = 8;

    constructor() {
        super(MashedPotatoes.#MASHED_POTATOES_COCKING_TIME,
            [new Ingredient('potato', 2),
                new Ingredient('butter', 1),     // TALLOW
                new Ingredient('sour_cream', 1), // TALLIED TALLOW
        ]);
    }
}

class Steak extends Dish {
    static #STEAK_COCKING_TIME = 7;

    constructor() {
        super(Steak.#STEAK_COCKING_TIME,
            [new Ingredient('meat', 10), // MOOOOOOOOOOORE MEET
        ]);
    }
}

class SteakAndFries extends Dish {
    static #STACK_AND_FRIES_COCKING_TIME = 22;

    constructor() {
        super(SteakAndFries.#STACK_AND_FRIES_COCKING_TIME,
            [new Ingredient('meat', 10), // MOOOOOOOOOOORE MEET
            new Ingredient('potato', 10),
        ]);
    }
}

class Kitchen {
    constructor() {
        this.ingridients = {}
        this.orderQueue = []
    }

    addToFridge(ingredients) {
        for(const i in ingredients) {
            this.ingridients[ingredients[i].name] = ingredients[i].amount;
        }
    }

    order(dish) {

        if (this.checkIngredients(dish)) {
            this.takeIngredient(dish);
            this.orderQueue.push(dish)
        } else {
            throw new Error('Not enough ingredients in fridge!')
        }

    }

    checkIngredients(dish) {
        let some = this;
        let res = true;
        dish.requiredIngredients.forEach(function (ingredient, _) {
            if (some.ingridients[ingredient.name] < ingredient.amount) {
                res = false;
                return;
            }
        });
        return res;
    }

    takeIngredient(dish) {
        let some = this;
        dish.requiredIngredients.forEach(function (ingredient, _) {
            some.ingridients[ingredient.name] -= ingredient.amount;
        });
    }

    async cookFastestOrder() {
        if (!this.orderQueue.length) {
            throw new Error('No orders, MacDonalt is very sad :+(.')
        }

        let minOrderIdx = 0;
        let minOrderCookingTime = 2e9;

        for (const orderIdx in this.orderQueue) {
            let nowCockingTime = this.orderQueue[orderIdx].cookingTime;
            if (nowCockingTime < minOrderCookingTime) {
                minOrderCookingTime = nowCockingTime;
                minOrderIdx = orderIdx;
            }
        }

        let finalOrder = this.orderQueue[minOrderIdx];
        this.orderQueue.splice(minOrderIdx, 1);

        return await finalOrder.cook();
    }

    async cookAllOrders() {
        let orders = [];

        while(this.orderQueue.length) {
            orders.push(await this.orderQueue.pop().cook())
        }

        return orders;
    }
}


//================================================================================================//
//============================================= test =============================================//
//================================================================================================//
async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingredient('potato',     2),
        new Ingredient('spaghetti',  1),
        new Ingredient('meat',       15),
        new Ingredient('tomato',     1),
        new Ingredient('butter',     1),
        new Ingredient('sour_cream', 1),
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();