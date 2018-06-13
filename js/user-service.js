'use strict';

var gProjects = [
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'Better to not become meal',
        desc: 'Nice and not very ugly pacman game',
        url: 'projs/pacman',
        publishedAt: 1528539449,
        labels: ['Attractive Game', 'Pacman', 'keyboard events'],
        client: 'Coding Academi Course'
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Good Game for Analytical people!',
        desc: 'Good and interesting game.',
        url: 'projs/minesweeper/index.html',
        publishedAt: 1527787021,
        labels: ['Matrixes', 'keyboard events', 'Mouse events'],
        client: 'Coding Academi Course'
    },
    {
        id: 'bookshop',
        name: 'Book Shop',
        title: 'Nice website to purchase books',
        desc: 'very nice and responsive place',
        url: 'projs/minesweeper/index.html',
        publishedAt: 1528724423,
        labels: ['Bootstrap', 'Mouse events'],
        client: 'Coding Academi Course'
    }

];
console.log(gProjects);

function getProjects() {
    return gProjects;
}

function getProjByIdx(idx) {
    return gProjects[idx];
}


