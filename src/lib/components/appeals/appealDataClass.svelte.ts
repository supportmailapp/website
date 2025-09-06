import { SvelteSet } from "svelte/reactivity";

export class AppealData {
  mode = $state<"user" | "server" | null>(null);
  serverName = $state<string>("");
  serverId = $state<string>("");
  banDate = $state<string>("");
  receivedErrorMsgs = new SvelteSet<string>();
  featureUsed = $state<string>("");
  /**
   * What the user thinks the reason for the action was.
   */
  acknowledgement = $state<string>("");
  whichRulesViolated = new SvelteSet<string>();
  readTos = $state<boolean>(false);
  readPP = $state<boolean>(false);
  ensureItDoesntHappenAgain = $state<string>("");
  whatToInvestigateIfError = $state<string>("");
  theoriesOnWhyThisWasMistaken = $state<string>("");
  whatWouldHelpToUnderstand = new SvelteSet<string>();
  isCommitedToFollowingRules = $state<string | null>(null);
  additionalInfo = $state<string>("");
  providedInfoIsAccurate = $state<boolean>(false);
  understandConsequences = $state<boolean>(false);

  constructor() {}
}
