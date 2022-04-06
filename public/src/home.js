function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++;
    }
  });

  return total;
}

function getMostCommonGenres(books) {
  // creates new array of most common genres with reduce()
  const result = books.reduce((accum, book) => {
    // gets the genre of current book
    const genre = book.genre;

    // gets the object 
    const genreInfo = accum.find((element) => element.name === genre);

    // if an object was not found, create a new one and push it into accum
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      // if object was found, then add 1 to count
      genreInfo.count++;
    }

    return accum;
  }, []);

  // sorts the array by count from greatest to least
  result.sort((genreA, genreB) => genreB.count - genreA.count);

  // limits array to 5
  result.splice(5);

  return result;
}

function getMostPopularBooks(books) {
  // creates an new array of most popular
  const result = books.map((book) => {
    const popularityInfo = {
      name: book.title,
      count: book.borrows.length,
    };

    return popularityInfo;
  });

  // sorts the new array by count: g to l
  result.sort((titleA, titleB) => titleB.count - titleA.count);

  // limits to 5 elements
  result.splice(5);

  return result;
}

function getMostPopularAuthors(books, authors) {
  // creates array of authors by popularity
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };

    return newAuthorInfo;
  });

  // sorts the new array by count: g to l
  result.sort((authorA, authorB) => authorB.count - authorA.count);

  // limits array to 5
  result.splice(5);

  return result;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};