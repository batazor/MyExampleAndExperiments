require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "the a user requires an email and password" do
    user = User.new

    assert !user.save, "The user was saved without email and password"

    # puts "--Errors--"
    # user.errors.full_messages.each { |msg| puts msg }
  end

  test "the a user have a unique email" do
    user = User.new
    user.email = users(:one).email

    assert !user.save, "The user was saved with an repeted email"
  end

  test "the a user requires a name" do
    user = User.new
    user.email = "oleg@gmail.com"
    user.password = "12345678"

    assert !user.save, "The user was saved without name"
  end
end
