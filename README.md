# easy-lru
A lru cache library. write with typescript.

# usage

    let lru = new EasyLru(10, (key:string)=>{
        console.log("remove", key);
    });
    lru.use("a", 4);
    lru.use("b", 4);
    lru.use("a", 4);
    lru.use("c", 4);
