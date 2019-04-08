function listAllRoutes(routerStack) {
    const routes = [];
    if (routerStack.length > 2) {
        for (const [index, value] of routerStack.entries()) {
            if (index < 2) {
                continue;
            }
            const path = value.route.path;
            const method = value.route.stack[0].method;
            routes.push({ method, path });
        }
    }

    console.log('List of Routes =>');
    for (route of routes) {
        console.log(`${route.method.toUpperCase()} path: ${route.path}`);
    }
}

module.exports = {
    listAllRoutes
}