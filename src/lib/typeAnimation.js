export function typeTo(display, start, target, typeSpeed = 60, deleteSpeed = typeSpeed) {
    let timer = null;

    function cancelAnimation() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    // If already at target, no-op
    if (start === target) {
        return cancelAnimation;
    }

    function commonPrefix(a, b) {
        const n = Math.min(a.length, b.length);
        let i = 0;
        while (i < n && a.charAt(i) === b.charAt(i)) i++;
        return i;
    }

    const common = commonPrefix(start, target);

    // If start is a prefix of target, just type the remainder.
    if (start.length < target.length && target.startsWith(start)) {
        let i = start.length;
        function typeStep() {
            i++;
            display.textContent = target.slice(0, i);
            if (i < target.length) timer = setTimeout(typeStep, typeSpeed);
            else timer = null;
        }
        typeStep();
        return cancelAnimation;
    }

    // Otherwise: delete down to common prefix, then type the rest of target.
    let i = start.length;
    function deleteStep() {
        i--;
        display.textContent = start.slice(0, i);
        if (i > common) timer = setTimeout(deleteStep, deleteSpeed);
        else {
            // now type from common -> target
            let j = common;
            function typeRest() {
                j++;
                display.textContent = target.slice(0, j);
                if (j < target.length) timer = setTimeout(typeRest, typeSpeed);
                else timer = null;
            }
            if (j < target.length) timer = setTimeout(typeRest, typeSpeed);
            else {
                // target is equal to common prefix
                display.textContent = target;
                timer = null;
            }
        }
    }

    // start deletion (or directly type if common === start.length handled above)
    if (i > common) deleteStep();
    else {
        // nothing to delete, just type remainder
        let j = common;
        function typeRestImmediate() {
            j++;
            display.textContent = target.slice(0, j);
            if (j < target.length) timer = setTimeout(typeRestImmediate, typeSpeed);
            else timer = null;
        }
        if (j < target.length) typeRestImmediate();
        else display.textContent = target;
    }

    return cancelAnimation;
}
