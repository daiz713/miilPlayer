require 'test_helper'

class MiilrawsControllerTest < ActionController::TestCase
  setup do
    @miilraw = miilraws(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:miilraws)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create miilraw" do
    assert_difference('Miilraw.count') do
      post :create, miilraw: { category_id: @miilraw.category_id, page_url: @miilraw.page_url, photo_id: @miilraw.photo_id, photo_title: @miilraw.photo_title, photo_url: @miilraw.photo_url, recipe_id: @miilraw.recipe_id, taken_at: @miilraw.taken_at, user_icon_url: @miilraw.user_icon_url, user_id: @miilraw.user_id, user_name: @miilraw.user_name, venue_id: @miilraw.venue_id, venue_name: @miilraw.venue_name, venue_web: @miilraw.venue_web }
    end

    assert_redirected_to miilraw_path(assigns(:miilraw))
  end

  test "should show miilraw" do
    get :show, id: @miilraw
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @miilraw
    assert_response :success
  end

  test "should update miilraw" do
    patch :update, id: @miilraw, miilraw: { category_id: @miilraw.category_id, page_url: @miilraw.page_url, photo_id: @miilraw.photo_id, photo_title: @miilraw.photo_title, photo_url: @miilraw.photo_url, recipe_id: @miilraw.recipe_id, taken_at: @miilraw.taken_at, user_icon_url: @miilraw.user_icon_url, user_id: @miilraw.user_id, user_name: @miilraw.user_name, venue_id: @miilraw.venue_id, venue_name: @miilraw.venue_name, venue_web: @miilraw.venue_web }
    assert_redirected_to miilraw_path(assigns(:miilraw))
  end

  test "should destroy miilraw" do
    assert_difference('Miilraw.count', -1) do
      delete :destroy, id: @miilraw
    end

    assert_redirected_to miilraws_path
  end
end
