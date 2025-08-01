public abstract class User {
    protected int id;
    protected String name;

    protected UserType userType;

    public User(int id, String name, UserType userType) {
        this.id = id;
        this.name = name;
        this.userType = userType;
    }

    public abstract void getUserInfo();

    public abstract void accessLibarry(Library library);

}
