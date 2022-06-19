export class Index {
    username!: string
    password!: string
}

export interface Login {
    username: string;
    password: string;
}


/*
3 Ways to fix Property '..' has no initializer and is not definitely assigned in the constructor.ts
Approach 1
    name: string = ''

Approach 2
    constructor(name: string) {
        this.name = name
    }

Approach 3
    name!: string


You can also get rid of warning by setting strictPropertyInitialization: false inside tsconfig.json
*/