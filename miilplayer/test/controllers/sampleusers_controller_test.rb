require 'test_helper'

class SampleusersControllerTest < ActionController::TestCase
  setup do
    @sampleuser = sampleusers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sampleusers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sampleuser" do
    assert_difference('Sampleuser.count') do
      post :create, sampleuser: { email: @sampleuser.email, name: @sampleuser.name }
    end

    assert_redirected_to sampleuser_path(assigns(:sampleuser))
  end

  test "should show sampleuser" do
    get :show, id: @sampleuser
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sampleuser
    assert_response :success
  end

  test "should update sampleuser" do
    patch :update, id: @sampleuser, sampleuser: { email: @sampleuser.email, name: @sampleuser.name }
    assert_redirected_to sampleuser_path(assigns(:sampleuser))
  end

  test "should destroy sampleuser" do
    assert_difference('Sampleuser.count', -1) do
      delete :destroy, id: @sampleuser
    end

    assert_redirected_to sampleusers_path
  end
end
