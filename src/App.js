import '../global.css'
import { NavigationContainer } from '@react-navigation/native'
import Route from './navigation/Route'
import { UserProvider } from './context/userContext'

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </UserProvider>
  )
}

export default App  