// 1)
function identity<T>(arg: T): T {
    return arg;
}

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

function getLastElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

const myObject: KeyValuePair<number, string> = { key: 1, value: "Hello" };

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    return arg;
}

function getMinZoneValue(zones: number[]): number | undefined {
    if (zones.length === 0) {
        return undefined;
    }
    return Math.min(...zones);
}


// 2)
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

type Sortable = number | string;

function sortArray<T extends Sortable>(arr: T[]): T[] {
    const newArr = [...arr];
    return newArr.sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    });
}

interface ArrayManager<T> {
    add(item: T): void;
    remove(item: T): boolean;
    removeAtIndex(index: number): T | undefined;
    getLength(): number;
    getArray(): T[];
}

class GenericArrayManager<T> implements ArrayManager<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): boolean {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    removeAtIndex(index: number): T | undefined {
        if (index >= 0 && index < this.items.length) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }

    getLength(): number {
        return this.items.length;
    }

    getArray(): T[] {
        return [...this.items];
    }
}

function processValue<T extends object | string>(value: T): T {
    return value;
}

function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}


// 3)
class KeyValueStore<K, V> {
    private store: Map<K, V> = new Map();

    addPair(key: K, value: V): void {
        this.store.set(key, value);
    }

    getValue(key: K): V | undefined {
        return this.store.get(key);
    }
}

class Stack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

function searchData<T>(arr: T[], content: Partial<T>): T[] {
    return arr.filter(item => {
        for (const key in content) {
            if (Object.prototype.hasOwnProperty.call(content, key)) {
                if ((item as any)[key] !== content[key]) {
                    return false;
                }
            }
        }
        return true;
    });
}

interface Pair<K, V> {
    key: K;
    value: V;
}

function mergePairs<K1, V1, K2, V2>(pair1: Pair<K1, V1>, pair2: Pair<K2, V2>): Pair<K1 | K2, V1 | V2> {
    return { ...pair1, ...pair2 } as Pair<K1 | K2, V1 | V2>;
}

class LimitedArray<T> {
    private items: T[] = [];
    private readonly maxSize: number;

    constructor(maxSize: number) {
        if (maxSize <= 0) {
            throw new Error("Maksimal uzunlik musbat son bo'lishi kerak.");
        }
        this.maxSize = maxSize;
    }

    addItem(item: T): void {
        if (this.items.length >= this.maxSize) {
            throw new Error(`Array maksimal uzunlikka (${this.maxSize}) yetdi. Element qo'shib bo'lmaydi.`);
        }
        this.items.push(item);
    }

    getArray(): T[] {
        return [...this.items];
    }
}


// 4)
class Queue<T> {
    private items: T[] = [];

    enqueue(element: T): void {
        this.items.push(element);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

interface RecursiveObject<T> {
    [key: string]: T | RecursiveObject<T> | unknown;
}

function isRecursiveObject<T>(value: T | RecursiveObject<T> | unknown): value is RecursiveObject<T> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function findValueByKey<T>(obj: RecursiveObject<T>, targetKey: string): (T | RecursiveObject<T> | unknown)[] {
    let results: (T | RecursiveObject<T> | unknown)[] = [];

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (key === targetKey) {
                results.push(value);
            }
            if (isRecursiveObject(value)) {
                results = results.concat(findValueByKey(value as RecursiveObject<T>, targetKey));
            }
        }
    }
    return results;
}

function filterArray<T, U>(arr: (T | U)[], typeGuard: (item: T | U) => item is U): U[] {
    return arr.filter(typeGuard) as U[];
}

function getUniqueElements<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

class MultiGenericStore<T, U> {
    private delegateKey: T;
    private value: U;

    constructor(delegateKey: T, value: U) {
        this.delegateKey = delegateKey;
        this.value = value;
    }

    getDelegateKey(): T {
        return this.delegateKey;
    }

    getValue(): U {
        return this.value;
    }
}

console.log("salom");

const myStore = new MultiGenericStore<string, number>("user_id", 12345);