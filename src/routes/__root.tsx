import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start"></div>
                <div className="navbar-center">
                    <Link className="btn btn-ghost text-xl" to="/">
                        Momento Topics Demo
                    </Link>
                </div>
                <div className="navbar-end"></div>
            </div>
            <Outlet />
        </>
    ),
});
