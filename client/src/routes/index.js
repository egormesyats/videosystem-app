import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Videos from '@/components/Videos'
import Watch from '@/components/Watch'
import WatchExample from '@/components/WatchExample'
import Upload from '@/components/Upload'
import Users from '@/components/Users'
import Profile from '@/components/Profile'

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/videos/:videoId',
    name: 'Watch',
    component: Watch
  },
  {
    path: '/watchexample',
    name: 'WatchExample',
    component: WatchExample
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes
