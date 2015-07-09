using System;

namespace log4netEventBroadcast
{

	class TestListener
	{
		public static void ListenToEventBroadcast()
		{
			BroadcastEventService.Instance.BroadcastStart += delegate {
				Console.WriteLine("Listening Started");
			};
	
			BroadcastEventService.Instance.BroadcastEvent += (sender, eventArgs) => {
				Console.WriteLine(eventArgs.Message);
			};

			BroadcastEventService.Instance.BroadcastDone += delegate {
				Console.WriteLine("Listening Stopped");
			};
				
		}

	}


	class MainClass
	{
		public static void Main (string[] args)
		{
			Console.WriteLine ("Inside the Mainclass");
			TestListener.ListenToEventBroadcast ();

			LogGenerationSampleClass logGenerationSampleClass = new LogGenerationSampleClass ();
			logGenerationSampleClass.GenerateSomeMeaninglessLog ();

		}
	}
}
