using System;
using log4net;
using log4net.Config;
using System.IO;
using System.Configuration;

namespace log4netEventBroadcast
{
	public class LogGenerationSampleClass
	{
		private static readonly ILog _log = LogManager.GetLogger(typeof(LogGenerationSampleClass));

		static LogGenerationSampleClass() {
			XmlConfigurator.Configure(new System.IO.FileInfo("Configs/log4net_config.xml"));
		}

		public LogGenerationSampleClass ()
		{
			Console.WriteLine ("Generated log sample class");
		}

		public void GenerateSomeMeaninglessLog() 
		{
			_log.Info ("Start generating meaningless log");

			_log.Info ("This is very useful");
		
			_log.Warn("See the warning level is skipped");

		}

	}
}

