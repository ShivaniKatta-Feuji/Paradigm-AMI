module.exports={
    alertHandling: function (page){
        page.on('dialog',async(dialog)=>{
            await dialog.accept()
        })
    }
}