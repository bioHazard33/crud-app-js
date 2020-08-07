// assuming titles=JSON.parse(readFileSync('somefile'))

app.put('/',(req,res)=>{
    let title=req.params.body
    let id=req.params.id
    let flag=0;
    for(let i=0;i<titles.length;i++){
        if(titles[i].id==id){
            flag=1;
            titles[i].title=title
        }
    }
    if(flag)    res.send('not found')
    fs.writefilesync('somefile',titles)
    res.send('DONE')
})