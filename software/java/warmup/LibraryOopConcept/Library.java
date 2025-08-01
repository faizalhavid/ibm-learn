
import java.util.List;

public class Library extends Book {
    private List<Book> books;
    private List<Member> members;
    private List<Librarian> librarians;

    public List<Librarian> getLibrarians() {
        return librarians;
    }

    public void setLibrarians(List<Librarian> librarians) {
        this.librarians = librarians;
    }

    // overloading -> when same return type, name but diff args
    public void borrowBook(Member member, Book book) {
        if (book.getIsAvailable()) {
            System.out.println("The Book " + book.getTitle() + "have borrowed by" + member.name);
        } else {
            System.out.println("Cannot Borrow The Book " + book.getTitle() + "because already borrowed");
        }
    }

    public void returnBook(Member member, Book book) {
        book.setIsAvailable(true);
        System.out.println("The Book " + book.getTitle() + "have returned by" + member.name);
    }

    public void removeBook(Book book, Librarian librarian) {
        books.remove(book);
        System.out.println("The Book " + book.getTitle() + "have remove by" + librarian.name);
    }

    public void addBook(Book book, Librarian librarian) {
        this.books.add(book);
        System.out.println("A new book" + book.getTitle() + "just added by" + librarian.name);
    }

    public void registerMember(Member member) {
        this.members.add(member);
        System.out.println("Greetings " + member.name + "as new Member");
    }

    public void registerLibrarians(Librarian librarian) {
        this.librarians.add(librarian);
        System.out.println("Enjoy you work " + librarian.name + " as new librarian");
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public List<Member> getMembers() {
        return this.members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }
}
