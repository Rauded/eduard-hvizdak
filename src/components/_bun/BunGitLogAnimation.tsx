import React, { useEffect, useRef } from 'react';
import './bun-gitlog.scss';
import barRectsHtml from '../../data/gitlogBars';

const BUCKETS: [number, number][] = [[2,24682],[1,30055],[0,0],[2,34118],[1,423],[0,0],[0,0],[0,0],[0,0],[1,50171],[1,571],[1,28149],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,39752],[0,0],[0,0],[1,51187],[0,0],[0,0],[1,71728],[0,0],[1,128701],[0,0],[0,0],[0,0],[1,155057],[0,0],[1,6667],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,27939],[1,43313],[0,0],[1,65129],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,175],[0,0],[0,0],[2,166],[2,554],[0,0],[1,1920],[1,285],[1,1342],[1,12985],[1,495],[0,0],[1,106],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,3381],[5,256],[5,8024],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,3186],[4,5330],[0,0],[0,0],[0,0],[0,0],[3,546],[1,208],[4,324],[2,423],[1,228],[1,327],[2,639],[2,263],[0,0],[2,397],[0,0],[1,850],[0,0],[0,0],[1,788],[0,0],[1,1005],[1,2],[0,0],[1,4527],[0,0],[1,2274],[0,0],[1,2796],[0,0],[0,0],[0,0],[0,0],[0,0],[1,2061],[1,27309],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,7076],[1,224],[1,84],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,734],[0,0],[1,909],[0,0],[0,0],[0,0],[1,895],[1,321],[2,236],[0,0],[0,0],[1,2142],[0,0],[0,0],[0,0],[1,3238],[0,0],[0,0],[3,4549],[0,0],[0,0],[0,0],[1,5478],[1,357],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,3417],[0,0],[2,3790],[0,0],[0,0],[0,0],[2,170],[0,0],[0,0],[1,3983],[0,0],[0,0],[1,1567],[4,4516],[1,997],[0,0],[1,99],[0,0],[0,0],[0,0],[1,14777],[1,499],[1,541],[1,3085],[0,0],[1,186],[1,1999],[1,2581],[8,4680],[11,7618],[17,19507],[15,17903],[26,9307],[21,13538],[22,8634],[26,6913],[21,8799],[27,7106],[22,8983],[23,4053],[17,5214],[20,8837],[27,3352],[23,1526],[13,2706],[13,795],[4,855],[7,251],[8,5273],[15,712],[29,4924],[22,6605],[182,20903],[44,3566],[6,1022],[13,1322],[15,873],[134,4985],[22,1187],[53,2778],[47,5237],[47,5456],[24,1996],[51,2474],[39,1279],[36,1498],[19,663],[14,289],[12,253],[22,1027],[21,832],[7,153],[10,115],[14,318],[5,173],[2,14],[2,4],[1,2],[1,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,13],[8,885],[33,2229],[25,860],[155,3980],[114,3876],[118,4374],[46,3737],[318,27211],[80,3847],[119,4832],[74,2862],[44,1731],[28,455],[64,682],[18,134],[2,22],[1,42],[5,2525],[5,18348],[9,1743],[2,787],[3,154],[3,58],[2,149],[1,3],[0,0],[1,30],[1,23],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[12,171],[32,1830],[44,2520],[33,1855],[42,8412],[22,1941],[60,18175],[59,23746],[48,9133],[54,10312],[40,6466],[44,4745],[34,10953],[51,3332],[65,3421],[42,2471],[60,2815],[23,1297],[19,401],[49,4930],[71,11232],[34,4582],[42,2662],[32,1108],[50,3335],[41,3682],[63,3352],[48,4491],[59,1655],[73,1422],[81,4590],[28,2868],[20,1865],[41,4554],[12,929],[2,18],[2,401],[4,886],[1,4],[1,1],[1,54],[4,613],[3,392],[6,1084],[2,121],[5,1053],[2,2384],[2,7],[1,77],[0,0],[2,655],[6,977],[4,3390],[3,1282],[1,142],[0,0],[2,343],[6,3523],[3,2764],[2,449],[6,1044],[2,687],[2,39],[1,741],[9,5154],[7,4181],[4,1316],[0,0],[1,184],[5,1337],[11,2694],[11,1294],[5,238],[13,494],[8,470],[17,1187],[6,309],[3,491],[3,129],[0,0],[1,5],[3,959],[1,102],[3,101],[0,0],[1,494],[3,226],[0,0],[1,401],[1,84],[0,0],[0,0],[0,0],[1,77],[3,45],[0,0],[1,59],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,78],[1,72],[0,0],[1,271],[0,0],[0,0],[0,0],[0,0],[1,13],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,24],[3,224],[3,188],[3,1923],[1,1],[0,0],[2,19],[0,0],[1,2],[0,0],[1,273],[15,282],[25,2404],[15,517],[3,410],[2,6],[13,187],[22,1226],[10,547],[15,266],[49,869],[9,229],[2,7],[35,314],[36,693],[17,502],[10,279],[4,217],[4,210],[7,161],[10,417],[8,331],[5,193],[6,310],[13,557],[1,64],[12,2400],[13,800],[8,609],[9,264],[9,176],[9,610],[3,46],[10,279],[7,169],[4,175],[2,98],[0,0],[9,1000],[0,0],[3,184],[4,395],[4,327],[7,582],[3,500],[10,954],[3,104],[5,2640],[7,385],[2,153],[7,638],[6,393],[4,59],[6,281],[3,85],[4,203],[5,525],[1,6],[2,2],[1,62],[2,59],[5,279],[4,502],[1,8],[2,59],[1,103],[2,351],[2,15],[0,0],[0,0],[0,0],[0,0],[1,92],[5,127],[3,4],[5,45],[0,0],[1,756],[0,0],[1,0],[0,0],[0,0],[0,0],[4,732],[3,321],[6,136],[1,132],[1,224],[1,427],[7,1165],[2,44],[2,329],[0,0],[0,0],[0,0],[3,440],[3,617],[4,201],[4,608],[2,110],[2,152],[3,70],[5,404],[9,427],[28,2373],[9,324],[6,160],[5,1086],[6,1182],[7,795],[7,1189],[2,128],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,116],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,33],[1,33],[0,0],[0,0],[0,0],[4,296],[2,635],[2,70],[1,70],[1,94],[7,460],[7,279],[2,198],[6,288],[2,153],[4,2380],[3,417],[5,49],[4,64],[1,0],[1,46],[1,14],[1,1],[0,0],[1,96],[0,0],[0,0],[1,66],[0,0],[0,0],[1,69],[0,0],[0,0],[3,197],[1,0],[3,53],[2,203],[1,54],[0,0],[2,1257],[1,790],[4,1337],[6,1922],[4,1021],[4,201],[0,0],[10,725],[0,0],[0,0],[1,207],[0,0],[1,20],[0,0],[0,0],[0,0],[0,0],[1,268],[1,66],[0,0],[2,964],[1,219],[0,0],[2,423],[1,427],[2,159],[1,90],[2,37],[2,10],[1,11],[1,80],[0,0],[2,544],[2,12],[2,72],[1,7],[3,97],[2,20],[2,11],[0,0],[2,55],[1,3],[0,0],[1,15],[44,2123],[14,306],[0,0],[0,0],[6,226],[0,0],[0,0],[0,0],[2,1213],[5,4243],[3,3283],[2,10],[1,22],[0,0],[0,0],[0,0],[0,0],[1,18],[0,0],[0,0],[0,0],[1,388],[1,2210],[1,400],[1,4542],[2,220],[0,0],[1,1817],[1,14],[0,0],[0,0],[0,0],[1,3705],[0,0],[0,0],[7,189],[2,8],[2,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,23],[0,0],[0,0],[0,0],[0,0],[1,2660],[2,2333],[1,19],[0,0],[0,0],[5,2015],[1,14],[1,51],[0,0],[0,0],[3,345],[1,38],[0,0],[2,541],[2,89],[1,25],[1,68],[1,66],[0,0],[0,0],[0,0],[0,0],[9,273],[6,214],[0,0],[2,21],[0,0],[0,0],[2,135],[0,0],[0,0],[0,0],[1,18],[0,0],[1,570],[1,229],[0,0],[0,0],[1,5],[0,0],[0,0],[0,0],[0,0],[0,0],[1,7],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,65],[0,0],[2,318],[1,114],[0,0],[1,11],[0,0],[1,24],[0,0],[0,0],[0,0],[0,0],[0,0],[1,131],[0,0],[0,0],[0,0],[0,0],[0,0],[1,317],[1,5],[0,0],[0,0],[0,0],[1,3],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,26],[1,74],[0,0],[0,0],[1,7],[0,0],[0,0],[0,0],[0,0],[1,5],[0,0],[0,0],[0,0],[3,53],[0,0],[1,25],[0,0],[0,0],[0,0],[1,1],[0,0],[0,0],[0,0],[0,0],[0,0],[1,29],[1,99],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,4],[0,0],[0,0],[0,0],[2,413],[0,0],[0,0],[0,0],[0,0],[0,0],[1,25],[0,0],[0,0],[0,0],[0,0],[0,0],[1,43],[0,0],[0,0],[1,130],[2,20],[2,278],[2,58],[0,0],[1,957],[1,11],[0,0],[3,582],[0,0],[0,0],[0,0],[0,0],[1,146],[1,26],[1,21],[1,125],[0,0],[1,81],[0,0],[0,0],[0,0],[0,0],[1,82],[0,0],[0,0],[1,160],[0,0],[0,0],[1,306],[0,0],[0,0],[0,0],[1,54],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,9],[1,66],[0,0],[0,0],[1,134],[0,0],[0,0],[0,0],[0,0],[2,22],[1,17],[0,0],[0,0],[0,0],[1,18],[2,140],[0,0],[0,0],[1,56],[0,0],[0,0],[0,0],[1,44],[1,187],[1,23],[0,0],[1,144],[0,0],[0,0],[1,8],[1,356],[0,0],[0,0],[0,0],[1,18],[0,0],[0,0],[0,0],[2,26],[0,0],[0,0],[5,9356],[0,0],[1,2],[0,0],[1,9],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,8],[1,35],[0,0],[0,0],[0,0],[1,94],[0,0],[0,0],[0,0],[0,0],[1,55],[1,52],[0,0],[1,8],[0,0],[0,0],[8,2111],[1,14],[2,364],[2,5],[1,59],[0,0],[9,1536],[3,174],[4,516],[6,1115],[1,15],[5,1605],[0,0],[0,0],[1,185],[1,215],[4,156],[3,305],[0,0],[0,0],[0,0],[0,0],[0,0],[1,6],[1,164],[6,1703],[1,675],[2,429],[2,363],[2,50],[0,0],[0,0],[23,4802],[46,1673],[51,2859],[28,1180],[9,186],[0,0],[0,0],[4,247],[0,0],[0,0],[0,0],[12,1099],[0,0],[0,0],[0,0],[3,78],[0,0],[12,889],[0,0],[2,296],[14,839],[1,16],[12,528],[0,0],[32,3134],[0,0],[11,992],[0,0],[12,786],[0,0],[9,325],[10,330],[0,0],[23,1990],[11,830],[0,0],[10,601],[3,119],[8,214],[11,798],[0,0],[1,52],[24,3520],[0,0],[10,559],[4,259],[7,116],[0,0],[0,0],[9,430],[27,1089],[3,81],[1,9],[6,177],[11,7852],[10,530],[1,152],[17,1004],[12,1237],[1,6],[8,260],[0,0],[10,591],[1,2544],[10,359],[0,0],[9,681],[5,156],[0,0],[1,6],[9,8600],[1,17],[5,245],[3,91],[5,134],[0,0],[21,868],[6,280],[4,27],[8,134],[1,1],[10,411],[7,103],[10,160],[5,34],[1,17],[7,306],[9,194],[4,52],[6,258],[0,0],[9,349],[0,0],[4,56],[0,0],[4,116],[1,137576],[0,0],[0,0],[0,0],[0,0],[0,0],[1,61],[1,20],[0,0],[0,0],[0,0],[0,0],[0,0],[1,28],[0,0],[0,0],[1,47],[0,0],[0,0],[1,82],[0,0],[0,0],[1,48],[0,0],[0,0],[1,26],[1,25],[2,3],[1,106],[0,0],[0,0],[1,17],[0,0],[0,0],[1,3],[0,0],[0,0],[1,2],[0,0],[0,0],[0,0],[1,16],[12,991],[2,512],[3,146],[1,63],[11,949],[0,0],[10,345],[1,26],[18,579],[12,6072],[0,0],[0,0],[1,130],[1,27],[2,43],[0,0],[0,0],[0,0],[3,36],[1,4],[23,1383],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,116],[18,939],[0,0],[0,0],[0,0],[1,324],[1,56],[0,0],[0,0],[0,0],[0,0],[2,84],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[7,273],[0,0],[1,137],[1,50],[1,43],[0,0],[0,0],[0,0],[2,38],[0,0],[5,281],[0,0],[0,0],[0,0],[1,2],[0,0],[0,0],[0,0],[0,0],[1,131],[0,0],[12,1920],[0,0],[0,0],[1,19],[2,351],[0,0],[0,0],[1,20],[0,0],[10,552],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,65],[0,0],[0,0],[0,0],[0,0],[9,592],[0,0],[0,0],[1,687],[0,0],[0,0],[0,0],[0,0],[10,372],[0,0],[1,8],[0,0],[0,0],[0,0],[1,1235],[0,0],[0,0],[11,4012],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[14,1051],[0,0],[0,0],[0,0],[0,0],[0,0],[7,680],[0,0],[0,0],[0,0],[9,411],[1,1],[0,0],[0,0],[0,0],[2,12],[0,0],[4,302],[0,0],[0,0],[0,0],[1,5],[0,0],[8,2962],[1,13],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,122],[0,0],[0,0],[2,317],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,58],[1,5],[3,51],[1,0],[0,0],[0,0],[0,0],[2,21],[1,4],[1,580],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,13],[0,0],[0,0],[0,0],[1,48],[0,0],[0,0],[1,8],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,150],[0,0]];;

const TICKER: [number, string, number, number][] = [[0,"phase-a: draft batch head-1 (100 files)",12379,0],[51881000,"phase-b1: paths + string compile (gate drafts; minimal Encoding/strings/lexer surface)",2312,2149],[103773000,"phase-b2: js_parser/ast round B \u2014 Expr/Stmt/Data/Store real (new_store! macro, StoreRef<T>",909,752],[138717000,"phase-b2: bake DevServer init/start_bundle/finalize/on_request (6 verify bugs: asset hash ",734,20],[140371000,"phase-b2: web_worker/Debugger types real (verify: register mutex race UAF, &mut cross-thre",1358,1311],[141327000,"phase-b2: css rule_parsers types (TopLevelRuleParser/StyleSheet; warn &self\u2192&mut UB)",68,56],[142462000,"phase-b2: Process impl REAL (init_posix/on_exit/wait/watch/kill; verify: WaiterThread::app",11,16],[143426000,"phase-b2: P r8 generate_import_stmt/append_part REAL; Runtime::Imports confirmed (verify: ",160,6],[144436000,"phase-b2: shell escape_8bit/needs_escape REAL; should_keep_stmt confirmed",26,9],[145603000,"phase-b2: shell setup_io 2 bugs (RDONLY\u2192RDWR, PWD); options::Framework REAL; ExprData::wri",1051,970],[146646000,"phase-c: dep-graph \u2014 css feature-gated off bun_bin path",23,0],[147765000,"phase-d: harvest \u2014 bun_jsc 250\u21920; timeout 2s; bun_runtime 840 (recursive-ungate spillover)",429,2],[150427000,"phase-d(bun_core): fix output fn-form callers (fmt,args), mimalloc::Option::show_errors, d",259,179],[151724000,"phase-d(src/css/selectors): fix AttributeInNoNamespace value binding in serialize_componen",7,8],[152588000,"phase-d(jpa): maybe.rs",22,11],[152720000,"phase-d(jpa): foldStringAddition.rs",1,0],[152798000,"phase-d(todo): js_parser_jsc/Macro.rs: restructure Macro resolver/vm as Option<> for disab",266,73],[152903000,"phase-d(todo): bundler/LinkerGraph.rs: port .server arm to bun_core::todo_panic!",26,10],[152975000,"phase-d(todo): node/util/validators.rs: port get_type_name + add JSValue::js_type_string",5,7],[153236000,"phase-d: jsc/static_export wrapped_name \u2014 port comptime prefix concat",21,7],[155254000,"phase-d: resolver/package_json: pass bump to EString::string / use as_utf8_string_literal ",36,30],[155629000,"phase-d(tier3): bun_resolver \u2014 Output:: callers \u2192 &format_args! (drop \"{}\" passthrough); i",52,43],[155798000,"phase-d(unsafe): jsc/AnyPromise.rs",18,4],[155925000,"phase-d(unsafe): src/string/wtf.rs",87,15],[156343000,"phase-d(tier3): bun_alloc \u2014 MOVE LinuxMemFdAllocator/MimallocArena/allocation_scope \u2192 bun_",23,42],[156885000,"phase-d(unsafe): src/resolver/lib.rs",22,13],[157466000,"phase-d(bundler): computeCrossChunkDependencies.rs",103,90],[157933000,"phase-d(bundler): generateCompileResultForCssChunk",73,57],[158617000,"phase-d(unsafe): runtime/allocators/LinuxMemFdAllocator.rs",43,22],[159284000,"phase-d(unsafe): src/runtime/server/RequestContext.rs",6,6],[159806000,"phase-d(unsafe): install/PackageManager.rs",74,12],[160436000,"phase-d(unsafe): src/runtime/api/bun/process.rs",31,12],[161387000,"phase-d(unsafe): src/resolver/lib.rs",10,10],[162954000,"phase-d(bundler): fix VirtualMachine.rs [3200,4000) \u2014 gate stub-ZigStackTrace bodies, rout",159,140],[164814000,"phase-d(bundler): deref bun_vm raw pointer in JSSourceMap findSourceMap",2,1],[179933000,"phase-d(bun_sql_jsc): fix DecodeBinaryValue raw()/read() arg types, add NewReader int_u24/",72,39],[180699000,"phase-d: harvest",24,14],[181510000,"phase-d(bun_runtime): fix imports in crypto/PasswordObject.rs (StringOrBuffer, JSPromise/S",13,5],[181559000,"phase-d(bun_runtime): fix EventLoopTimerTag import path in TimeoutObject",34,20],[181607000,"phase-d(bun_runtime): fix node_zlib_binding imports (Buffer, WorkPool, codegen ctor shims)",107,64],[181666000,"phase-d(bun_runtime): fix DevServer.rs imports, lifetimes, and BodyReaderHandler impl",17,10],[182261000,"phase-d(bun_runtime): WatcherAtomics: fix Timer/ConcurrentTask paths, adapt to MaybeUninit",6,3],[182331000,"phase-d(bun_runtime): fix import/path resolution in HotReloadEvent.rs",115,94],[182389000,"phase-d(bun_runtime): printDiff: fix diff_match_patch type/API references",23,41],[182451000,"phase-d(bun_runtime): MarkdownObject \u2014 wire bun_md::root paths, RendererImpl trait dispatc",51,11],[182541000,"phase-d(bun_runtime): Blob.rs [1601,2401) \u2014 resolve S3File/s3_client/S3UploadResult/Archiv",19,4],[182890000,"phase-d(bun_runtime): impl ResumableSinkContext for S3UploadStreamWrapper; unify Resumable",7,13],[183557000,"phase-d(bun_runtime): scan_command \u2014 shim gated bun_install stubs, fix err_generic 2-arg f",4,5],[183686000,"phase-d(bun_runtime): fix bake/dev_server/lifecycle type mismatches + add AnyServer::on_re",45,47],[183767000,"phase-d(bun_runtime): SourceMapStore: Rc deref for PackedMap content, drop fn-ptr cast on ",14,8],[183836000,"phase-d(bun_runtime): DevServer defer_request \u2014 dedupe Option-unwrap of HiveArray::get",19,51],[183898000,"phase-d(bun_runtime): fix borrowck in expect/toBe.rs (scopeguard owns &mut Expect; second ",57,46],[183945000,"phase-d(bun_runtime): Collection.rs \u2014 DeprecatedStrong, *mut BunTestRoot init, &",17,10],[184009000,"phase-d(bun_runtime): fix CodegenCallbackType in markdown/Markdown.rs",14,10],[184054000,"phase-d(bun_runtime): fix io/stdio_data_impl.rs imports (Terminal, Stdout, ArgList)",27,40],[184079000,"phase-d(bun_runtime): fix HttpDownload.handler() types (EventLoopTimer path)",2,2],[184106000,"phase-d(bun_runtime): fix Runtime/transpiler/mime import in ShellCompletionsCommand",3,2],[184154000,"phase-d(bun_runtime): fix ResourceUsageReporter calling convention (Route / Response)",1,2],[186600000,"phase-d(bun_resolver): rewire DirType/GlobalFolder to bun_resolver::ResolveDirType",249,32],[186672000,"phase-d(bun_resolver): export ResolveDirType enum values from bun_resolver (replaces secon",6,6],[187275000,"phase-d(bun_resolver): redirect NodeJS/Macro.h to bun_resolver module",4,1],[189866000,"phase-d(bun_resolver): fix optional_value, parseJSON, resolveEmbeddedFileNodeJS import path",7,7],[191159000,"phase-d(bun_resolver): fix deserializePluginAPI & linker/evaluate order resolution, etc.",342,88],[191881000,"phase-d: fix NodeFallbackModules visibility in snapshot_module_resolve_callback",28,4],[192033000,"phase-d: fix JSC::JSValue -> JSC::JSNetworkLayer construct for new ClientMetadata path",9,2],[199091000,"phase-e: fix bun/bootstrap/node/ModuleLoader/ModuleLoader.h path in both C++ and string fo",20,5],[199276000,"phase-e: add missing imports in bun_js + explicit Deref/TryUnpack for MimallocArena/track",5,1],[199453000,"phase-e: fix function-pointer signature for FFI callbacks in binding codegen",1,1],[199527000,"phase-e: dead_code allow + fix unused import warnings from bun:ffi codegen",1,1],[201871000,"phase-e: bun:jsc/JavaScriptCore/API/JSContextRef.cpp: add explicit <JavaScriptCore/JavaSc",3,0],[202024000,"phase-e: fix src/bun.js/module_wrapper bindgen: add missing JSStringIsEqual include",3,1],[202119000,"phase-e: fix Windows compat in JSArrayBufferSink.cpp: rename close() to close_impl() to av",5,2],[202214000,"phase-e: bump CMake + add CoreMC.h path for macOS SDK headers",3,2],[202540000,"phase-e: bun:jsc: move JSSizingUtils include into local + fix .cpp includes (needs CMake ",1295,0],[202662000,"phase-e: bun:jsc: fix windows jscore include, move JSSizingUtils include in bindings array",3,1],[205496000,"unsafe -101: backref-deref/nonnull-asref in sql_jsc",31,33],[221983000,"unsafe -100: backref-deref in jsc (19% of all unsafe blocks)",167,95],[234909000,"unsafe -99: backref-deref in resolver (9% of all unsafe blocks)",72,52],[250643000,"unsafe -98: backref-deref in bundler (8% of all unsafe blocks)",66,51],[270549000,"unsafe -97: nonnull-asref in src/bun.js (8% of all unsafe blocks)",692,79],[278581000,"unsafe -96: nonnull-asref in src/bun.js/api (8% of all unsafe blocks)",253,260],[284507000,"unsafe -95: nonnull-asref in src/bun.js/node (6% of all unsafe blocks)",576,156],[289674000,"unsafe -94: nonnull-asref in src/bun.js/bindgen (5% of all unsafe blocks)",292,159],[293595000,"unsafe -93: backref-deref in src/runtime (5% of all unsafe blocks)",329,175],[296966000,"unsafe -92: backref-deref in src/runtime (5% of all unsafe blocks)",81,42],[299769000,"unsafe -91: nonnull-asref in src/bun.js (4% of all unsafe blocks)",96,63],[302878000,"unsafe -90: backref-deref in sql_jsc (3% of all unsafe blocks)",49,23],[307022000,"unsafe -89: backref-deref in jsc (3% of all unsafe blocks)",22,21],[309768000,"unsafe -88: backref-deref + nonnull-asref in resolver (3% of all unsafe blocks)",41,35],[315247000,"unsafe -87: nonnull-asref in src/bun.js (3% of all unsafe blocks)",114,82],[319322000,"unsafe -86: backref-deref in src/runtime/install (3% of all unsafe blocks)",63,349],[326070000,"unsafe -85: nonnull-asref in bun_js (2% of all unsafe blocks)",44,38],[346497000,"unsafe -84: nonnull-asref in src/bun.js (2% of all unsafe blocks)",432,228],[364830000,"unsafe -83: backref-deref/nonnull-asref in js_parser (2% of all unsafe blocks)",68,28],[375773000,"unsafe -82: nonnull-asref in src/runtime (2% of all unsafe blocks)",215,157],[406477000,"unsafe -81: nonnull-asref in src/bun.js (2% of all unsafe blocks)",331,333],[425433000,"unsafe -80: nonnull-asref in bun_resolver (2% of all unsafe blocks)",93,51],[428958000,"unsafe -79: nonnull-asref in src/bun.js (2% of all unsafe blocks)",152,123],[435734000,"unsafe -78: nonnull-asref in src/bun.js (1% of all unsafe blocks)",188,77],[439089000,"unsafe -77: nonnull-asref in src/runtime (1% of all unsafe blocks)",119,88],[443378000,"unsafe -76: nonnull-asref in src/bun.js (1% of all unsafe blocks)",74,54],[449848000,"unsafe -75: nonnull-asref in src/bun.js (1% of all unsafe blocks)",247,193],[456412000,"unsafe -74: nonnull-asref in src/runtime (1% of all unsafe blocks)",205,113],[462140000,"unsafe -73: nonnull-asref in src/bun.js (1% of all unsafe blocks)",159,107],[469789000,"unsafe -72: backref-deref in js_parser (1% of all unsafe blocks)",82,92],[475071000,"unsafe -71: backref-deref in bun_resolver (1% of all unsafe blocks)",68,47],[480410000,"unsafe -70: nonnull-asref in bun_js (1% of all unsafe blocks)",48,30],[489058000,"unsafe -69: nonnull-asref + retag-ref in src/bun.js (1% of all unsafe blocks)",72,32],[514039000,"unsafe -68: backref-deref in src/runtime (<1% of all unsafe blocks)",447,165],[518111000,"unsafe -67: backref-deref in src/bun.js (<1% of all unsafe blocks)",178,59],[520958000,"unsafe -66: nonnull-asref in src/runtime (<1% of all unsafe blocks)",89,44],[526755000,"unsafe -65: backref-deref in src/runtime (<1% of all unsafe blocks)",64,36],[530597000,"unsafe -64: nonnull-asref in bundler (<1% of all unsafe blocks)",62,65],[534578000,"unsafe -63: backref-deref in src/runtime (<1% of all unsafe blocks)",87,74],[538063000,"unsafe -62: nonnull-asref in js_parser (<1% of all unsafe blocks)",35,39],[540589000,"unsafe -61: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",60,21],[542474000,"unsafe -60: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",30,18],[546541000,"unsafe -59: nonnull-asref in bun_resolver (<1% of all unsafe blocks)",90,37],[548692000,"unsafe -58: backref-deref in src/runtime (<1% of all unsafe blocks)",66,40],[551618000,"unsafe -57: nonnull-asref in js_parser (<1% of all unsafe blocks)",86,43],[556824000,"unsafe -56: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",102,68],[560826000,"unsafe -55: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",93,85],[563101000,"unsafe -54: retag-ref in src/runtime (<1% of all unsafe blocks)",146,53],[565260000,"unsafe -53: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",39,40],[567297000,"unsafe -52: backref-deref in bun_resolver (<1% of all unsafe blocks)",34,22],[569251000,"unsafe -51: backref-deref in src/runtime (<1% of all unsafe blocks)",36,17],[572009000,"unsafe -50: backref-deref in js_parser (<1% of all unsafe blocks)",45,28],[575899000,"unsafe -49: backref-deref in src/bun.js (<1% of all unsafe blocks)",44,80],[577808000,"unsafe -48: nonnull-asref in js_parser (<1% of all unsafe blocks)",34,26],[579966000,"unsafe -47: backref-deref in js_parser (<1% of all unsafe blocks)",69,62],[581884000,"unsafe -46: backref-deref in bun_resolver (<1% of all unsafe blocks)",25,16],[583795000,"unsafe -45: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",60,33],[585193000,"unsafe -44: nonnull-asref in src/runtime (<1% of all unsafe blocks)",63,42],[587037000,"unsafe -43: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",52,64],[589154000,"unsafe -42: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",33,17],[591025000,"unsafe -41: backref-deref in js_parser (<1% of all unsafe blocks)",27,12],[592458000,"unsafe -40: nonnull-asref in src/runtime (<1% of all unsafe blocks)",37,28],[593948000,"unsafe -39: backref-deref in src/runtime (<1% of all unsafe blocks)",44,18],[595534000,"unsafe -38: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",31,21],[597605000,"unsafe -37: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",5,3],[599557000,"unsafe -36: backref-deref in src/runtime (<1% of all unsafe blocks)",22,17],[601383000,"unsafe -35: nonnull-asref in bun_resolver (<1% of all unsafe blocks)",33,10],[603051000,"unsafe -34: nonnull-asref in js_parser (<1% of all unsafe blocks)",21,19],[604827000,"unsafe -33: nonnull-asref in src/runtime (<1% of all unsafe blocks)",16,10],[607015000,"unsafe -32: backref-deref in src/runtime (<1% of all unsafe blocks)",33,14],[608965000,"unsafe -31: backref-deref in js_parser (<1% of all unsafe blocks)",35,13],[611782000,"unsafe -30: backref-deref in js_parser (<1% of all unsafe blocks)",34,18],[614050000,"unsafe -29: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",17,18],[617604000,"unsafe -28: backref-deref in src/bun.js (<1% of all unsafe blocks)",14,42],[619793000,"unsafe -27: nonnull-asref in src/runtime (<1% of all unsafe blocks)",19,10],[621501000,"unsafe -26: nonnull-asref in bundler (<1% of all unsafe blocks)",15,14],[624418000,"unsafe -25: backref-deref in js_parser (<1% of all unsafe blocks)",36,33],[625837000,"unsafe -24: backref-deref in js_parser (<1% of all unsafe blocks)",22,13],[628140000,"unsafe -23: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",15,10],[630745000,"unsafe -22: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",15,17],[633441000,"unsafe -21: backref-deref in src/runtime (<1% of all unsafe blocks)",10,8],[635126000,"unsafe -20: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",14,8],[637246000,"unsafe -19: nonnull-asref in src/runtime (<1% of all unsafe blocks)",17,57],[639159000,"unsafe -18: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",11,73],[641694000,"unsafe -17: nonnull-asref in bun_resolver (<1% of all unsafe blocks)",7,7],[643273000,"unsafe -16: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",77,14],[644860000,"unsafe -15: nonnull-asref in src/bun.js (<1% of all unsafe blocks)",1,1],[646224000,"unsafe -14: backref-deref in src/runtime (<1% of all unsafe blocks)",1,2],[648283000,"unsafe -13: backref-deref in src/bun.js (<1% of all unsafe blocks)",33,13],[650412000,"unsafe -12: backref-deref/nonnull-asref/slice-raw-parts in sql_jsc",111,147],[654406000,"perf: bun_core: drop misplaced cold-hints on Once::init_slow + env-var first-lookup (alway",11,5],[658375000,"test(fs): scale recursive readdir iter counts down for debug/ASAN throughput",12,2],[663382000,"unsafe -11: nonnull-asref in runtime/api (subprocess pipe_detach/pipe_release centralise F",55,47],[691425000,"divergence-audit: standalone-graph ELF cfg tests (1 case)",64,1],[696165000,"perf: generateCompileResultForJSChunk \u2014 reset_retain_with_limit(8M) instead of full reset ",13,2],[703530000,"perf: Tree depth_buf_uninit + hoist dep-id slice in add_dependency \u2014 install frozen-lockfi",35,13],[722732000,"perf(resolver): single-pass property scan for tsconfig.json parsing",131,47],[740683000,"perf(collections): add precomputed-hash raw-entry probe/insert to StringHashMap",53,1],[762541000,"perf(startup): refresh symbol-ordering-file and add suffix sync helper",186,29],[775792000,"perf(startup): restore hot-startup symbol-ordering file",2395,0]];

const TOTAL_COMMITS = 6502;
const TOTAL_LINES = 1780453;
const t0 = 1777903528000;
const totalMs = 840600000;
const DUR = 30000;

const cumC: number[] = [];
const cumI: number[] = [];
{
  let cc = 0, cl = 0;
  for (const [c, l] of BUCKETS) {
    cc += c; cl += l;
    cumC.push(cc); cumI.push(cl);
  }
}

const BunGitLogAnimation: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const commitsEl = root.querySelector('.r-commits') as HTMLElement;
    const linesEl = root.querySelector('.r-lines') as HTMLElement;
    const clockEl = root.querySelector('.r-clock') as HTMLElement;
    const headEl = root.querySelector('.r-playhead') as SVGLineElement;
    const btnEl = root.querySelector('.r-btn') as HTMLButtonElement;
    const logRows = Array.from(root.querySelectorAll('.r-log')) as HTMLElement[];

    const clockFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit',
    });

    const num = (n: number) => n.toLocaleString('en-US');
    let raf = 0, started = false;

    function render(p: number) {
      const i = Math.min(BUCKETS.length - 1, Math.floor(p * BUCKETS.length));
      commitsEl.textContent = num(p >= 1 ? TOTAL_COMMITS : cumC[i]);
      linesEl.textContent = '+' + num(p >= 1 ? TOTAL_LINES : cumI[i]);
      clockEl.textContent = clockFmt.format(new Date(t0 + p * totalMs)) + ' PDT';

      const px = (p * 760).toFixed(1);
      headEl.setAttribute('x1', px);
      headEl.setAttribute('x2', px);

      const ms = p * totalMs;
      let hi = -1;
      for (let k = 0; k < TICKER.length; k++) {
        if (TICKER[k][0] <= ms) hi = k;
        else break;
      }
      for (let j = 0; j < logRows.length; j++) {
        const k = hi - (logRows.length - 1 - j);
        const row = logRows[j];
        const sEl = row.querySelector('.r-log-s') as HTMLElement;
        const iEl = row.querySelector('.r-log-i') as HTMLElement;
        const dEl = row.querySelector('.r-log-d') as HTMLElement;
        if (k < 0) {
          sEl.textContent = '';
          iEl.textContent = '';
          dEl.textContent = '';
          continue;
        }
        sEl.textContent = '\u00b7 ' + TICKER[k][1];
        iEl.textContent = '+' + num(TICKER[k][2]);
        dEl.textContent = '\u2212' + num(TICKER[k][3]);
      }
    }

    function play() {
      cancelAnimationFrame(raf);
      if (!btnEl.style.minWidth) {
        btnEl.style.minWidth = btnEl.getBoundingClientRect().width + 'px';
      }
      btnEl.textContent = '\u21BB replay';
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / DUR);
        render(p);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    btnEl.addEventListener('click', play);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5) {
          io.disconnect();
          if (!started) {
            started = true;
            play();
          }
          return;
        }
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.75] });
    io.observe(root);

    return () => {
      btnEl.removeEventListener('click', play);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Bars rendered from pre-extracted SVG rects (src/data/gitlogBars.ts)

  return (
    <section id="njZKzxzFYy" ref={rootRef} style={{ overflowAnchor: 'none', overflow: 'hidden', borderColor: 'var(--border)', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: 'var(--surface)', color: 'var(--text)', boxShadow: 'var(--shadow-card)' }} className="not-prose -mx-4 my-12 sm:mx-0 sm:rounded-2xl sm:border lg:-mx-8 xl:-mx-24">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px', padding: '20px 28px 4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)' }}>git log {'\u00b7'} <span style={{ color: 'var(--claude)' }}>claude</span>/phase-a-port</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--text-muted)' }}>peak: 58 commits in one minute</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 18px', padding: '4px 28px 0' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--status-good)' }} />lines added
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--status-bad)' }} />lines removed
        </span>
      </div>
      <div style={{ padding: '4px 28px 0', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.4, color: 'var(--text-muted)' }}>
        A migration replayed commit by commit: each row is one commit, the bars show lines added and removed.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px 32px', padding: '12px 28px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
          <div style={{ minWidth: '4.5ch' }}>
            <div className="r-commits" style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--text-strong)' }}>0</div>
            <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>commits</div>
          </div>
          <div>
            <div className="r-lines" style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--status-good)' }}>+0</div>
            <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>lines written, rewrites included</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <button type="button" className="r-btn" style={{ cursor: 'pointer', borderRadius: 6, border: '1px solid var(--border)', backgroundColor: '#fff', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>{'\u25B6'} replay 11 days in 30s</button>
          <span className="r-clock" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--text-strong)' }}>Mon, May 4, 7:05 AM PDT</span>
        </div>
      </div>
      <div style={{ padding: '0 28px' }}>
        <svg viewBox="0 0 760 130" style={{ width: '100%' }} role="img" aria-label="Commits over the 11 days, colored by new code vs deletion">
          <g dangerouslySetInnerHTML={{ __html: barRectsHtml }} />
          <g>
            <line x1="4" y1="0" x2="4" y2="110" stroke="var(--text-faint)" strokeDasharray="3 3"></line>
            <text x="9" y="125" fontSize="11.5" fill="var(--text-muted)" textAnchor="start" className="hidden sm:inline">first 100-file draft batch</text>
          </g>
          <g>
            <line x1="338.96" y1="0" x2="338.96" y2="110" stroke="var(--text-faint)" strokeDasharray="3 3"></line>
            <text x="338.96" y="125" fontSize="11.5" fill="var(--text-muted)" textAnchor="middle" className="hidden sm:inline">PR #30412 opened</text>
          </g>
          <g>
            <line x1="756" y1="0" x2="756" y2="110" stroke="var(--text-faint)" strokeDasharray="3 3"></line>
            <text x="751" y="125" fontSize="11.5" fill="var(--text-muted)" textAnchor="end" className="hidden sm:inline">merged</text>
          </g>
          <line x1="0" y1="0" x2="0" y2="110" stroke="var(--accent)" strokeWidth="2" className="r-playhead"></line>
        </svg>
      </div>
      <div style={{ margin: '12px 28px 20px', borderRadius: 8, border: '1px solid var(--border)', backgroundColor: 'var(--surface-sunken)', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.25 }}>
        {[0, 1, 2].map((ri) => (
          <div key={ri} className="r-log" style={{ display: 'flex', height: 20, alignItems: 'baseline', gap: 12, color: ri === 2 ? 'var(--text-strong)' : 'var(--text-muted)' }}>
            <span className="r-log-s" style={{ minWidth: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{'\u00A0'}</span>
            <span className="r-log-i" style={{ flexShrink: 0, color: 'var(--status-good)' }}></span>
            <span className="r-log-d" style={{ flexShrink: 0, width: 56, textAlign: 'right', color: 'var(--status-bad)' }}></span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BunGitLogAnimation;
