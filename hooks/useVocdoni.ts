'use client';

import {Election, EnvOptions, PlainCensus, VocdoniSDKClient} from '@vocdoni/sdk';
import {ethers} from "ethers";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function useVocdoni() {
    const initClient = async (signer: any) => {
        const client = new VocdoniSDKClient({
            env: EnvOptions.STG,
            wallet: signer,
        });

        console.log('Creating account...');
        const info = await client.createAccount()
        if (info.balance <= 10) {
            console.log('Funding account...');
            await client.collectFaucetTokens()
        }
        console.log('Account created:', info);
        return client;
    }

    const createElection = (census: any, title: string, desc: string, endDate: Date, imageUri: string) => {
        const election = Election.from({
            title: title,
            description: desc,
            header: imageUri,
            streamUri: imageUri,
            endDate: endDate.getTime(),
            census,
        });
        return election;
    }

    const addQuestion = (election: any, title: string, description: string, options: any[]) => {
        election.addQuestion(title, description, options);
    }

    const initElection = async (signer:any) => {
        const client = await initClient(signer)
        const census = new PlainCensus()
        // const randomWallet = ethers.Wallet.createRandom()
        // census.add(randomWallet.address)
        // const endDate = new Date('2023-01-23 23:23:23')
        // const election = createElection(census, "election title", "election desc", endDate, 'https://source.unsplash.com/random/2048x600')
        // console.log('Adding questions...');
        // const questions = [
        //     {
        //         title: 'question 1',
        //         description: 'question 1 desc',
        //         options: [
        //             {
        //                 title: 'option 1',
        //                 value: '1',
        //             },
        //             {
        //                 title: 'option 2',
        //                 value: '2',
        //             }
        //         ]
        //     }
        // ]
        // questions.map((question) => addQuestion(election, question.title, question.description, question.options))
        // console.log('Questions added')
        // console.log(client)
        // const electionId = await client!.createElection(election)
        // console.log('Election created:', electionId);
        // client!.setElectionId(electionId)
        // await delay(14000)
        // return electionId;
    }

    return {
        initClient,
        initElection,
    }
}