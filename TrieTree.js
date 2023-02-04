import DynamicHashtable from "./DynamicHashtable.js";
import LinkedList from "./LinkedList.js";

class Node {
    constructor(key, value) {
        this.key = key;
        this.charecters = new DynamicHashtable();
        this.isEnd = false;
    }

}
class TrieTree {
    constructor() {
        this.root = new Node(undefined);
        this.findings = new LinkedList();
    }

    add(key) {
        let crawl = this.root;
        for (let i = 0; i < key.length; i++) {
            if (!crawl.charecters.find(key[i])) {
                crawl.charecters.add(key[i], new Node(key[i]));
            }
            crawl = crawl.charecters.find(key[i]);
        }
        crawl.isEnd = true;
    }

    #search(root, res) {
        root.charecters.forEach((key, value) => {
            res += key
            this.#search(value, res);
        });
        if (root.isEnd) this.findings.add_last(res);
    }


    search(key) {
        let crawl = this.root;
        let res = "";
        for (let i = 0; i < key.length; i++) {
            if (!crawl.charecters.find(key[i]))
                return undefined;
            if (crawl.key) {
                res += crawl.key;
            }
            crawl = crawl.charecters.find(key[i]);
        }
        res += crawl.key
        this.findings = new LinkedList();
        this.#search(crawl, res);
        const temp = this.findings;
        this.findings = new LinkedList();
        return temp;
    }

}


// test
const test = new TrieTree();
test.add("2283602831");
test.add("228377");
test.add("2283784");
test.add("2483784");
console.log(test.search("228"));
