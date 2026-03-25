import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    price : Nat;
    description : Text;
    category : Category;
    rating : Nat;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  type Category = {
    #cases;
    #power;
    #audio;
    #protection;
  };

  type Cart = Map.Map<Nat, Nat>;

  module Category {
    public func toText(category : Category) : Text {
      switch (category) {
        case (#cases) { "Cases" };
        case (#power) { "Power" };
        case (#audio) { "Audio" };
        case (#protection) { "Protection" };
      };
    };
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Cart>();
  let wishlist = Map.empty<Principal, Set.Set<Nat>>();

  var nextId = 100;

  func getCartInternal(user : Principal) : Cart {
    switch (carts.get(user)) {
      case (null) { Runtime.trap("User has not started a cart yet.") };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func addItemToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1") };
    if (products.get(productId) == null) { Runtime.trap("Product does not exist") };

    let cart : Cart = switch (carts.get(caller)) {
      case (null) { Map.empty<Nat, Nat>() };
      case (?v) { v };
    };

    cart.add(productId, quantity);
    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    ignore getCartInternal(caller);
    carts.add(caller, getCartInternal(caller));
  };

  public query ({ caller }) func getCart() : async [(Product, Nat)] {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("User has not started a cart yet.") };
      case (?cart) {
        cart.toArray().map(func((productId, quantity)) { (getProductInternal(productId), quantity) });
      };
    };
  };

  func getProductInternal(productId : Nat) : Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product with id " # productId.toText() # " does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    getProductInternal(productId);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().sort().filter(func(product) { product.category == category });
  };

  public shared ({ caller }) func addToWishlist(productId : Nat) : async () {
    ignore getProductInternal(productId);
    let userWishlist : Set.Set<Nat> = switch (wishlist.get(caller)) {
      case (null) { Set.empty<Nat>() };
      case (?wishlist) { wishlist };
    };
    userWishlist.add(productId);
    wishlist.add(caller, userWishlist);
  };

  public query ({ caller }) func getWishlist() : async [Product] {
    switch (wishlist.get(caller)) {
      case (null) { [] };
      case (?userWishlist) {
        userWishlist.toArray().map(getProductInternal);
      };
    };
  };

  products.add(1, { id = 1; name = "Slim Case"; price = 15_99; description = "Ultra-thin hard case for iPhone"; category = #cases; rating = 4 });
  products.add(2, { id = 2; name = "Wireless Earbuds"; price = 49_99; description = "True wireless bluetooth earbuds"; category = #audio; rating = 5 });
  products.add(3, { id = 3; name = "Screen Protector"; price = 9_99; description = "Tempered glass screen protector"; category = #protection; rating = 4 });
  products.add(4, { id = 4; name = "Power Bank"; price = 29_99; description = "10000mAh power bank"; category = #power; rating = 5 });
  products.add(5, { id = 5; name = "Rugged Case"; price = 19_99; description = "Shock-proof rugged case"; category = #cases; rating = 5 });
  products.add(6, { id = 6; name = "Car Charger"; price = 12_99; description = "Dual USB car charger"; category = #power; rating = 4 });
  products.add(7, { id = 7; name = "Wireless Charger"; price = 24_99; description = "Qi wireless charging pad"; category = #power; rating = 5 });
  products.add(8, { id = 8; name = "Bluetooth Speaker"; price = 39_99; description = "Portable bluetooth speaker"; category = #audio; rating = 5 });

  nextId := 9;
};
