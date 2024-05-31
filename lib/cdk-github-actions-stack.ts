import { Stack, StackProps } from 'aws-cdk-lib';
import { EndpointType, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


export class CdkGithubActionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // AWS Lambdaリソースを定義
    const helloFunction = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_20_X,      // 実行環境を最新のNode.js 20.xに更新
      code: Code.fromAsset('src/'),      // コードは "src" ディレクトリから読み込む
      handler: 'lambda/hello.handler'    // ファイルは "hello"、関数は "handler"
    });

    // API Gateway REST APIリソースを定義し、"hello" 関数をバックエンドに設定
    new LambdaRestApi(this, 'Endpoint', {
      handler: helloFunction,
      endpointTypes: [EndpointType.EDGE],
    });
  }
}