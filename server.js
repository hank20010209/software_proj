const express = require('express')
const app = express()
const port = 8333

app.use(express.static('public'))
app.use(express.json())


var testData = [
    {
        "BookName": "被討厭的勇氣",
        "BookInfo": "所謂的自由，就是被別人討厭。<br>有人討厭你，正是你行使自由、依照自己的生活方針過日子的標記。",
        "BookCover": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/065/31/0010653153_bc_01.jpg&v=543bb7fak&w=280&h=280",
        "BookLink": "https://www.books.com.tw/products/0010653153"
    }
]

app.get('/info/:dynamic', (req, res) => {
    const { dynamic } = req.params
    const {key} = req.query
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
    console.log(dynamic, key)
    res.status(200).json({info: 'Oh YES'})
})

app.post('/', (req, res) => {
    const {parcel} = req.body
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
    
    let findFlag = -1
    for(i = 0; i < testData.length; i++)
    {
        if(parcel == testData[i]['BookName'])
            findFlag = i
    }
    if(!parcel){
        return res.status(400).send({status: 'failed', info: 'failed'})
    }
    if(findFlag == -1){
        res.status(200).send({status: 'received', info: 'Book not found'})
    }
    if(findFlag != -1)
        res.status(200).send({status: 'received', info: testData[findFlag]['BookName'] + ',' + testData[findFlag]['BookInfo'] + ',' + testData[findFlag]['BookCover'] + ',' +testData[findFlag]['BookLink']})
})

app.options ('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
    res.status(200).send({status: 'received'})
})

app.listen(port,  () => console.log('Server has started on port', port))