export default [
    { path: '/issue', needLogin: false },
    { path: '/AddIssue', needLogin: true },
    { path: '/IssueDel/:id', needLogin: false },
    { path: '/books', needLogin: false },
    { path: '/interviews', needLogin: false },
    { path: '/personal', needLogin: true },
    { path: '/books/:id', needLogin: false },
    { path: '/search', needLogin: false },
]