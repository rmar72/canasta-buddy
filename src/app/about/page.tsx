// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function AboutPage() {
//   return (
//     <div className="p-8 flex justify-center">
//       <Card className="max-w-3xl text-center shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             About Canasta Buddy
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
          // <p className="text-lg leading-relaxed text-muted-foreground">
          //   In today’s inflated economy, it’s harder than ever to keep our
          //   pantries stocked without breaking the bank. Gone are the days when
          //   we could easily afford the essentials while indulging in a few
          //   extras.
          // </p>
          // <p className="text-lg leading-relaxed text-muted-foreground mt-4">
          //   <strong>Canasta Buddy</strong> is here to help. It’s the concept of
          //   an organized basket that empowers hardworking individuals to stay
          //   within their budgets. With Canasta Buddy, you can track your
          //   spending and make informed decisions—like deciding to put back a few
          //   snacks if it means avoiding financial strain on other household
          //   expenses.
          // </p>
          // <p className="text-lg leading-relaxed text-muted-foreground mt-4">
          //   Times are tough, but with Canasta Buddy, we can tackle these soaring
          //   prices together. Let’s stay organized and keep our budgets in check,
          //   one basket at a time.
          // </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-col items-center space-y-10">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-700">
          About Canasta Buddy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your companion for smarter food budgeting in today’s economy.
        </p>
      </div>

      {/* Decorative Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Informative Section */}
        <Card className="max-w-4xl shadow-lg p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Why Canasta Buddy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">
              In today’s economy, maintaining your pantry isn’t as easy as it used
              to be. Rising costs mean we need to think smarter about every dollar
              we spend.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              <strong>Canasta Buddy</strong> provides a simple, effective way to
              organize your budget. By tracking every item in your basket, you can
              decide what fits your financial plan and what doesn’t—so you’re not
              left short on other expenses.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              With rising costs all around us, tools like Canasta Buddy help keep
              us grounded and financially prepared, one basket at a time.
            </p>
          </CardContent>
        </Card>
        {/* Decorative SVG/Graphics */}
        <Card className="p-6 shadow-md">
          <CardContent className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-20 h-20 text-green-500"
              fill="currentColor"
            >
              <path d="M12 1.5C6.756 1.5 2.5 5.756 2.5 11c0 4.186 3.103 7.698 7.235 8.398L9 23l6-3.5v-2.102A8.526 8.526 0 0 0 19.5 11c0-5.244-4.256-9.5-9.5-9.5zm0 2c4.136 0 7.5 3.364 7.5 7.5S16.136 18.5 12 18.5 4.5 15.136 4.5 11 7.864 3.5 12 3.5z" />
            </svg>
            <p className="text-center text-muted-foreground mt-4">
              Track your pantry spending and organize your meals with ease.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardContent className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-20 h-20 text-yellow-500"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-2 5h4v1h-3v5h-1V7zm0 6h1v2h-1v-2z" />
            </svg>
            <p className="text-center text-muted-foreground mt-4">
              Make smarter choices to avoid overspending on household expenses.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
