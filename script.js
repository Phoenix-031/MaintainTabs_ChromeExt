
window.onload = () =>{
    const showUrl = document.querySelector('#output')

    let getAllTabs = []

    chrome.runtime.sendMessage({type: "getTabs"}, function (response){

        console.log(response)

        for(let tab in response) {
            let jsob = {}
            response[tab].title === 'Extensions' ? jsob.tabname = "" : jsob.tabname = response[tab].title
            jsob.url = response[tab].url
            jsob.tabid = response[tab].id
            jsob.thumburl = `https://img.youtube.com/vi/${String(response[tab].url.split("?")[1]).split("=")[1]}/maxresdefault.jpg`
            // https://img.youtube.com/vi/VID_ID/maxresdefault.jpg
            getAllTabs.push(jsob)
        }

        console.log(getAllTabs)

        document.querySelector('.count-div').innerHTML = `Count: ${getAllTabs.length}`

        for(let i=0;i<getAllTabs.length;i++) {
            const tablist = document.createElement('li')

            const infodiv = document.createElement('div')
            infodiv.classList.add('info-div')

            const utubeicon = document.createElement('img')
            utubeicon.classList.add('utube-icon')
            getAllTabs[i].url.split("?")[1] !== undefined ? utubeicon.src = getAllTabs[i].thumburl : utubeicon.classList.add('hide')

            const anchor = document.createElement('a')
            anchor.href = getAllTabs[i].url
            anchor.target = '_blank'
            getAllTabs[i].tabname === "" ? anchor.innerHTML = getAllTabs[i].url : anchor.innerHTML = getAllTabs[i].tabname

            const cross = document.createElement('span')
            cross.classList.add('cross')
            cross.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'


            const takebtn = document.createElement('button')
            takebtn.classList.add('takebtn')
            takebtn.innerHTML = "Open Tab"
            takebtn.classList.add(`${getAllTabs[i].tabid}`)

            takebtn.addEventListener('click', (e) =>{

                const tabId = e.target.classList[1]

                chrome.tabs.update(Number(tabId),{active:true})
            })

            cross.addEventListener('click', () =>{
                chrome.tabs.remove(getAllTabs[i].tabid)
                window.close()
            })


            
            const btndiv = document.createElement('div')

            btndiv.appendChild(takebtn)

            btndiv.appendChild(takebtn)

            infodiv.appendChild(utubeicon)
            infodiv.appendChild(anchor)
            infodiv.appendChild(cross)
            tablist.appendChild(infodiv)
            tablist.appendChild(btndiv)

            showUrl.appendChild(tablist)
        }
        
    })
}

// const clickregistered = () =>{
//     console.log("clicked")
// }