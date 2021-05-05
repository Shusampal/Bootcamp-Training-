const mongoose = require('mongoose');
const productModel = require('./models/product');

var blogs = [
    {
        title: "Nature",
        img: "https://images.unsplash.com/photo-1618218007550-dc5c2459881c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        author: "John",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sequi hic quas distinctio autem, rem neque soluta tenetur nihil veritatis nemo facilis similique qui iure, numquam aliquid ipsam sunt sapiente!"
    },
    {
        title: "Nature",
        img: "https://images.unsplash.com/photo-1584185643884-7d75e692e6c3?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        author: "Dan",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sequi hic quas distinctio autem, rem neque soluta tenetur nihil veritatis nemo facilis similique qui iure, numquam aliquid ipsam sunt sapiente!"
    },
    {
        title: "Nature",
        img: "https://images.unsplash.com/photo-1617989631635-b6bed73949dd?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        author: "Mark",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sequi hic quas distinctio autem, rem neque soluta tenetur nihil veritatis nemo facilis similique qui iure, numquam aliquid ipsam sunt sapiente!"
    },
    {
        title: "Nature",
        img: "https://images.unsplash.com/photo-1616390499568-9ae971dcc053?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        author: "Michael",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sequi hic quas distinctio autem, rem neque soluta tenetur nihil veritatis nemo facilis similique qui iure, numquam aliquid ipsam sunt sapiente!"
    }

]


const seedDB = async ()=>  {

    await productModel.insertMany(blogs);
    console.log("DB Seeded");
    
}


module.exports = seedDB;