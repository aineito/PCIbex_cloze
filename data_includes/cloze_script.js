
PennController.ResetPrefix(null);
PennController.AddHost("https://github.com/aineito/PCIbex_cloze/blob/ee4a1ca863f84155caf9685138859b2e84fa75eb/")
PennController.DebugOff()
PennController.Sequence("welcome","demographics","instructions","cloze_test", "send", "final")

var showProgressBar = false;

PennController("welcome",
  newHtml("intro", "welcome_screen.html")
    .print()
    ,
  newButton("continue", "Continue")
    .print()
    .wait(
        getHtml("intro").test.complete()
            .failure( getHtml("intro").warn() ) )
    );

PennController("demographics",
  newHtml("demographics", "demographics_screen.html")
    .settings.log()
    .print()
    ,
  newButton("continue", "Continue")
    .print()
    .wait(
        getHtml("demographics").test.complete()
            .failure( getHtml("demographics").warn() ) )
    );

PennController("instructions",
  newText("instructions","<p>In this test, you will see incomplete sentences.</p>"
          +"<p>Your task is to complete each incomplete sentence with a continuation you think is likely.</p>"
          +"<p>There will be many of them, so please try not to spend too much time on each sentence.</p>"
          +"<p>There is no right or wrong answers, so please simply type a continuation that first comes to mind.</p>")
    .settings.css("font-size", "20px")
    ,
  newCanvas("empty canvas", 1, 40) // add some space
     .print()
     ,
 newText("heading","EXAMPLE:")
   .settings.css("font-size", "40px")
   ,
 newCanvas("empty canvas", 1, 40) // add some space
    .print()
    ,
newText("example_items","<p>I celebrated my birthday with --- my family"
        +"I completely forgot to turn in my --- assignment<p>"
        +"Kate told me that she was on the way to the --- gym<p>"
        +"Last year, I had a chance to visit my family in --- Malaysia")
  .settings.css("font-size", "20px")
  ,
 newCanvas("empty canvas", 1, 40) // add some space
    .print()
    ,
  newButton("continue", "Continue")
  .print()
  .wait()
    );


PennController("cloze_test");


PennController.SendResults("send")

PennController("final",
  newText("thanks","This is the end of the test.<br>Thank you for taking part!")
  .settings.css("font-size","40px")
  .print()
  ,
  newButton("void")
  .wait()
);
