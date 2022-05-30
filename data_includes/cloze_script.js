
PennController.ResetPrefix(null);
PennController.AddHost("https://github.com/aineito/PCIbex_cloze/")
PennController.DebugOff()
PennController.Sequence("welcome","demographics","instructions","cloze_test", "send", "final")

var showProgressBar = true;

PennController("welcome",
  newHtml("intro", "welcome_screen.html")
    .print()
    ,
  newButton("consent", "Continue")
    .settings.center()
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
    .settings.center()
    .print()
    .wait(
        getHtml("demographics").test.complete()
            .failure( getHtml("demographics").warn() ) )
    );

PennController("instructions",
  newText("heading","INSTRUCTIONS:")
     .settings.css("font-size", "24px")
     .print()
     ,
  newText("instructions","<p>In this test, you will see incomplete sentences.</p>"
          +"<p>Your task is to complete each incomplete sentence with a continuation you think is likely.</p>"
          +"<p>There will be many of them, so please try not to spend too much time on each sentence.</p>"
          +"<p>There is no right or wrong answers, so please simply type a continuation that first comes to mind.</p>"
          +"<p>The presented sentences do NOT form a story, so please try NOT to connect each sentence to a previous/next one, "
          +"and please try to provide your continuation based only on the given sentence fragment.</p>")
     .settings.css("font-size", "20px")
     .print()
     ,
  newCanvas("empty canvas", 1, 10) // add some space
     .print()
     ,
  newText("heading","EXAMPLE:")
     .settings.css("font-size", "24px")
     .print()
     ,
  newText("example_items","<p>I celebrated my birthday with --- my family</p>"
          +"<p>I completely forgot to turn in my --- assignment</p>"
          +"<p>Kate told me that she was on the way to the --- gym</p>"
          +"<p>Last year, I had a chance to visit my family in --- Malaysia</p>")
    .settings.css("font-size", "20px")
    .print()
    ,
  newCanvas("empty canvas", 1, 10) // add some space
    .print()
    ,
  newButton("continue", "Continue")
    .settings.center()
    .print()
    .wait()
    ,
    newCanvas("empty canvas", 1, 10) // add some space
      .print()
    );

PennController.Template( PennController.GetTable("cloze_stimuli.csv"), // creates a template to be used for multiple trials; will use .csv in chunk_includes
                            variable =>
PennController("cloze_test",
    newText("reminder", "Please type a continuation you think is likely and click 'Continue'")
        .settings.css("font-size", "20px")
        .settings.center()
        .print()
        ,
   newCanvas("empty canvas", 1, 50) // add some space
       .print()
       ,
   newText("sentence_fragment", variable.Fragment)
       .settings.css("font-size", "20px")
       .print()
       ,
   newCanvas("empty canvas", 1, 10) // add some space
      .print()
      ,
   newTextInput("response_input","")
      .print()
      .settings.log()
      .lines(1)
      .size(200, 30)
      ,
  newVar("response")
       .set(getTextInput("response_input"))
       .global()
       ,
   newButton("Continue", "Continue")
        .settings.center()
        .print()
        .wait()
        ,
    getText("reminder")
        .remove()
        ,
    getButton("Continue")
        .remove()
      )

    .log("Item", variable.Item) // record item ID
    .log("Fragment", variable.Fragment) // record sentence fragment
    .log("Response", getVar("response")) // record participants' response
  );

PennController.SendResults("send")

PennController("final",
  newText("thanks","This is the end of the test.<br>Thank you for taking part!")
  .settings.center()
  .settings.css("font-size","30px")
  .print()
  ,
  newButton("void")
  .wait()
);
