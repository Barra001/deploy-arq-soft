export declare class Pipeline<T> {
    filters: ((element: T) => Promise<T> | T)[];
    constructor(filters?: ((element: T) => Promise<T> | T)[]);
    use(filter: (element: T) => Promise<T> | T): void;
    run(input: T): Promise<T>;
}
