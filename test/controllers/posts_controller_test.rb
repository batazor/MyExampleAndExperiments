require 'test_helper'

class PostsControllerTest < ActionController::TestCase
  setup do
    @post = posts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:posts)
  end

  test "should get redirected to login page when try to get new page and is not logger in" do
    get :new

    assert_response :redirect
    assert_redirected_to new_user_session_path
  end

  test "should get new page when logged in" do
    sign_in users(:one)

    get :new
    assert_response :success
  end

  test "should get redirected to login page when try to create a post and is not logged in" do
    post :create, post: { content: "Hello World" }

    assert_response :redirect
    assert_redirected_to new_user_session_path
  end

  test "should create post logged in" do
    sign_in users(:one)

    assert_difference('Post.count') do
      post :create, post: { content: @post.content, user_id: @post.user_id }
    end

    assert_redirected_to post_path(assigns(:post))
  end

  test "should get edit" do
    sign_in users(:one)

    get :edit, id: @post
    assert_response :success
  end

  test "should update post" do
    sign_in users(:one)

    patch :update, id: @post, post: { content: @post.content, user_id: @post.user_id }
    assert_redirected_to post_path(assigns(:post))
  end

  test "should destroy post" do
    sign_in users(:one)
    
    assert_difference('Post.count', -1) do
      delete :destroy, id: @post
    end

    assert_redirected_to posts_path
  end
end
