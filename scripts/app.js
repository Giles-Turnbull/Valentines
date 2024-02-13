const observerForHiddenTest = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hiddenTest');
hiddenElements.forEach((el) => observerForHiddenTest.observe(el));

const observerForHiddenTest2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show2');
        } else {
            entry.target.classList.remove('show2');
        }
    });
});

const hiddenElements2 = document.querySelectorAll('.hiddenTest2');
hiddenElements2.forEach((el) => observerForHiddenTest2.observe(el));

