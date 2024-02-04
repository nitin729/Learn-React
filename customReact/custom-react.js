const root = document.getElementById('root');

const customRender = (reactElement, root) => {
    const domElement = document.createElement(reactElement.element);
    domElement.innerHTML = reactElement.children;
    for (let prop in reactElement.props){
        if(prop === 'children') continue;
        domElement.setAttribute(prop,reactElement.props[prop]);
    } 
    root.appendChild(domElement);
}

/* const reactElement = {
    element: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click to visit google'
} */
const reactElement = {
    element: 'img',
    props: {
        src: 'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Random image',
        height: '500px',
        width: '500px'
    },
   // children: 'Click to visit google'
}

customRender(reactElement, root);
