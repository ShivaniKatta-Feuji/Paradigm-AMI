
function alertHandling(page) {
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });
}

module.exports={
    alertHandling
}