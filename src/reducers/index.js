import { combineReducers } from 'redux';

import SignInScreenReducers from './SignInScreenReducers';
import UserSettingsScreenReducers from './UserSettingsScreenReducers';
import ForgotPasswordScreenReducers from './ForgotPasswordScreenReducers';
import StoreScreenReducers from './StoreScreenReducers';
import StoreReviewsScreenReducers from './StoreReviewsScreenReducers';
import ShoppingMallScreenReducers from './ShoppingMallScreenReducers';
import ShoppingMallReviewScreenReducers from './ShoppingMallReviewsScreenReducers';
import StartScreenReducers from './StartScreenReducers';
import OpportunityDetailScreenReducers from './OpportunityDetailScreenReducers';
import BrandDetailScreenReducers from './BrandDetailScreenReducers';
import BrandReviewsScreenReducers from './BrandReviewsScreenReducers';
import UserReviewsScreenReducers from './UserReviewsScreenReducers';
import SearchResultsScreenReducers from './SearchResultsScreenReducers';
import FavoritesScreenReducers from './FavoritesScreenReducers';
import UserProfileScreenReducers from './UserProfileScreenReducers';
import PostScreenReducers from './PostScreenReducers';
import PostReducers from './PostReducers';
import WallScreenReducers from './WallScreenReducers';
import UserSortScreenReducers from './UserSortScreenReducers'
import UserGeneralSettingsScreenReducers from './UserGeneralSettingsScreenReducers'
import QuestionResultScreenReducers from './QuestionResultScreenReducers'
import SurveyResultScreenReducers from './SurveyResultScreenReducers'
import MapScreenReducers from './MapScreenReducers'
import SpecialToMeScreenReducers from './SpecialToMeScreenReducers'
import CommunicationScreenReducers from './CommunicationScreenReducers'
import HelpRequestScreenReducers from './HelpRequestScreenReducers'



export default combineReducers({
    signInScreenResponse: SignInScreenReducers,
    userSettingsScreenResponse: UserSettingsScreenReducers,
    forgotPasswordScreenResponse: ForgotPasswordScreenReducers,
    storeScreenResponse: StoreScreenReducers,
    storeReviewsScreenResponse: StoreReviewsScreenReducers,
    shoppingMallScreenResponse: ShoppingMallScreenReducers,
    shoppingMallReviewScreenResponse: ShoppingMallReviewScreenReducers,
    startScreenResponse: StartScreenReducers,
    opportunityDetailScreenResponse: OpportunityDetailScreenReducers,
    brandDetailScreenResponse: BrandDetailScreenReducers,
    brandReviewsScreenResponse: BrandReviewsScreenReducers,
    userReviewsScreenResponse: UserReviewsScreenReducers,
    searchResultsScreenResponse: SearchResultsScreenReducers,
    favoritesScreenResponse: FavoritesScreenReducers,
    userProfileScreenResponse: UserProfileScreenReducers,
    postScreenResponse: PostScreenReducers,
    postResponse: PostReducers,
    wallScreenResponse: WallScreenReducers,
    userSortScreenResponse: UserSortScreenReducers,
    userGeneralSettingsScreenResponse: UserGeneralSettingsScreenReducers,
    questionResultScreenResponse: QuestionResultScreenReducers,
    surveyResultScreenResponse: SurveyResultScreenReducers,
    mapScreenResponse: MapScreenReducers,
    specialToMeScreenResponse: SpecialToMeScreenReducers,
    communicationScreenResponse: CommunicationScreenReducers,
    helpRequestScreenResponse: HelpRequestScreenReducers,
});
