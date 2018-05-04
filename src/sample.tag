
app.tag
app
    div
        h1 app.tag
        button(click='{clicked}') count: {this.list.length}
        ul
            li(each='{item, index in list}') {index}: {item}

    style.
        div {
            background: cyan;
        }
        button {
            font-size: 1.5rem;
        }

    script.
        this.list = []

        this.on('mount', () => {
            console.log('app.tag mounted', opts)
        })

        clicked(e) {
            this.list.push(new Date().toString())
        }
