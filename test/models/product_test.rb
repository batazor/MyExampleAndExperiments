require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  fixtures :products

  test "product attributes must not be empty" do
    # Attributes should not be left empty
    product = Product.new
    assert product.invalid?
    assert product.errors[:title].any?
    assert product.errors[:description].any?
    assert product.errors[:price].any?
    assert product.errors[:image_url].any?
  end

  test "product is not valid without a unique title" do
    # if the product is no unique name, it is not valid
    product = Product.new(title: products(:ruby).title,
                          description: "yyy",
                          price: 1,
                          image_url: "fred.gif")

    # It has been used
    assert product.invalid?
    assert_equal [I18n.translate('activerecord.errors.message.taken')],
      product.errors[:title]
  end

  test "product title length must be at least 10" do
    product = Product.new(title: "My Book",
                          description: "yyy",
                          price: 1,
                          image_url: "zzz.jpg")

    assert product.invalid?
    assert_equal ["is too short (minimum is 10 characters)"],
    product.errors[:title]

    product.title = "This is longer than 10 characters"
    assert product.valid?
  end

  test "product price must be positive" do
    # Price must be positive
    product = Product.new(title: "My Book Title",
                          description: "yyy",
                          image_url: "zzz.jpg")
    product.price = -1
    assert product.invalid?
    assert_equal ["must be greater than or equal to 0.01"],
      product.errors[:price]

    # It must be greater than or equal to 0.01
    product.price = 0
    assert product.invalid?
    assert_equal ["must be greater than or equal to 0.01"],
      product.errors[:price]

    # Is good?
    product.price = 1
    assert product.valid?
  end

  def new_product(image_url)
    Product.new(title: "My Book Title",
                description: "yyy",
                price: 1,
                image_url: image_url)
  end

  test "image url" do
    # url image
    ok = %w{ fred.gif fred.jpg FRED.JPG fred.png Gred.Jpg http://a.b.c/x/y/z/fred.gif }
    bad = %w{ fred.doc fred.gif/more fred.gif.more }

    ok.each do |name|
      # It should be acceptable
      assert new_product(name).valid?, "#{name} should`t be invalid"
    end

    bad.each do |name|
      # It should not be acceptable
      assert new_product(name).invalid?, "#{name} should`t be valid"
    end
  end
end
