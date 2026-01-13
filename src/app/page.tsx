import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription>Ola</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Click me</Button>
          <Input /> 
        </CardFooter>
      </Card>
    </div>
  )
}

export default Home;