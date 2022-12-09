import Characters from "./Characters";

export const rectCollision = (r1: Characters, r2: Characters) => {
    return (
        r1.position.x + r1.dimensions.width >= r2.position.x &&
        r1.position.x <= r2.position.x + r2.dimensions.width &&
        r1.position.y + r1.dimensions.height >= r2.position.y &&
        r1.position.y <= r2.position.y + r2.dimensions.height
    );
};
